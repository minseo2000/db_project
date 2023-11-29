const {ConnectionPool} = require('mssql');
const axios = require('axios');

const config = {
        user : 'sa',
        password : '2019212950@M',
        database : 'netflix',
        server : 'minseotest.iptime.org',
        port : 50010,
        options: {
            trustServerCertificate: true
        },
}
const dbConnection = new ConnectionPool(config)
    .connect()
    .then((pool) => {
        console.log('connection complete');
        return pool;
    })
    .catch((err) => {
        console.log(err);
    })

async function queryDatabase(query, parameters){
    const pool = await dbConnection;
    try{
        const result = await pool.request()
            .input('id', parameters.id)
            .input('password', parameters.password)
            .input('LOLname', parameters.LOLname)
            .input('Tier', parameters.Tier)  // 'Tier'에 대한 입력 추가
            .input('Wins', parameters.Wins)  // 'Wins'에 대한 입력 추가
            .input('Losses', parameters.Losses)  // 'Losses'에 대한 입력 추가
            .input('WinRate', parameters.WinRate)  // 'WinRate'에 대한 입력 추가
            .query(query);
        return result.recordset;
       
    }
    catch(err){
        console.log(err);

    }
} 

async function getLOLuserinfo(LOLname) {
    const riotApiUrl = `https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-name/${encodeURIComponent(LOLname)}`;
    const response = await axios.get(riotApiUrl, {
        headers: { 'X-Riot-Token': 'RGAPI-5a5bca4f-c077-45a7-91f3-dd28a46277ca' }
    });
    // 소환사의 랭크 정보를 가져오는 추가 API 요청
    const summonerId = response.data.id;
    const rankedStatsResponse = await axios.get(`https://kr.api.riotgames.com/lol/league/v4/entries/by-summoner/${summonerId}`, {
        headers: { 'X-Riot-Token': 'RGAPI-5a5bca4f-c077-45a7-91f3-dd28a46277ca' }
    });
    const SolorankedStats = rankedStatsResponse.data.find(queue => queue.queueType === 'RANKED_SOLO_5x5');
    const TeamrankedStats = rankedStatsResponse.data.find(queue => queue.queueType === 'RANKED_FLEX_SR');
    
    if((SolorankedStats || TeamrankedStats) != undefined){
        if (!SolorankedStats ){
            return {
                name: LOLname, // 소환사 이름
                tier: `${TeamrankedStats.tier} ${TeamrankedStats.rank}`, // 티어
                wins: TeamrankedStats.wins, // 승리 수
                losses: TeamrankedStats.losses, // 패배 수
                winRate: ((TeamrankedStats.wins / (TeamrankedStats.wins + TeamrankedStats.losses)) * 100).toFixed(2) // 승률
            };
        }
        else {
            return {
                name: LOLname, // 소환사 이름
                tier: `${SolorankedStats.tier} ${SolorankedStats.rank}`, // 티어
                wins: SolorankedStats.wins, // 승리 수
                losses: SolorankedStats.losses, // 패배 수
                winRate: ((SolorankedStats.wins / (SolorankedStats.wins + SolorankedStats.losses)) * 100).toFixed(2)
            }
            
        }
    }
    else{
        return null;
    }

}


module.exports = {
    config,
    dbConnection,
    queryDatabase,
    getLOLuserinfo,
};

