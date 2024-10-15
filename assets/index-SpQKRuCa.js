(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))r(e);new MutationObserver(e=>{for(const s of e)if(s.type==="childList")for(const d of s.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&r(d)}).observe(document,{childList:!0,subtree:!0});function a(e){const s={};return e.integrity&&(s.integrity=e.integrity),e.referrerPolicy&&(s.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?s.credentials="include":e.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function r(e){if(e.ep)return;e.ep=!0;const s=a(e);fetch(e.href,s)}})();const ce="전세민",le="KR1";function ie(t,n){const a=t.info.participants.find(s=>s.puuid===n);if(!a)return null;const r=a.teamId,e=t.info.teams.find(s=>s.teamId===r);return e?{teamId:e.teamId,win:e.win,participant:a,participants:[t.info.participant]}:null}async function de(t,n,a){const s=(await(await fetch(`https://ddragon.leagueoflegends.com/cdn/${a}/data/ko_KR/champion.json`)).json()).data[t];if(s){const d=`https://ddragon.leagueoflegends.com/cdn/${a}/img/champion/${s.image.full}`,l=document.getElementById(`championIcon-${n}`);l?(l.src=d,l.alt=`${s.name} Icon`):console.error(`Champion icon element not found for match ${n}`)}else console.error("Champion not found.")}let w=null;async function me(){return w||(w=(await(await fetch("https://ddragon.leagueoflegends.com/api/versions.json")).json())[0],w)}async function ue(t,n,a,r){const e=document.getElementById(`ItemIcon-${n}_${a}`),s=document.createElement("div");if(s.className="Item-div",!e){console.error(`Item icon element not found for match ${n}`);return}e.style.width="30px",e.style.height="30px",t===0&&(e.src="../data/img/empty/empty-icon.png",e.alt="Empty Item Slot");try{const i=(await(await fetch(`https://ddragon.leagueoflegends.com/cdn/${r}/data/ko_KR/item.json`)).json()).data[t];if(i){const p=`https://ddragon.leagueoflegends.com/cdn/${r}/img/item/${t}.png`;e.src=p,e.alt=`${i.name} Icon`}else console.error(`Item not found for ItemNum ${t}`),e.src="../data/img/empty/empty-icon.png",e.alt="Empty Item Slot"}catch(d){console.error("Error fetching item data:",d),e.src="../data/img/empty/empty-icon.png",e.alt="Empty Item Slot"}}const pe={"Summoner's Rift":"소환사의 협곡","The Proving Grounds":"The Proving Grounds","Twisted Treeline":"뒤틀린 숲","The Crystal Scar":"수정의 상처","Howling Abyss":"칼바람 나락","Butcher's Bridge":"Butcher's Bridge","Cosmic Ruins":"Cosmic Ruins","Valoran City Park":"Valoran City Park","Substructure 43":"Substructure 43","Crash Site":"Crash Site","Nexus Blitz":"돌격 넥서스","Rings of Wrath":"Rings of Wrath"},fe={"Custom games":"커스텀 게임","Normal (Quickplay)":"일반","5v5 Draft Pick games":"일반","5v5 Blind Pick games":"일반","5v5 Ranked Solo games":"솔로 랭크","5v5 ARAM games":"무작위 총력전","5v5 Ranked Flex games":"자유 랭크","Summoner's Rift Clash games":"격전","ARAM Clash games":"격전","Co-op vs. AI Intermediate Bot games":"AI","Co-op vs. AI Intro Bot games":"AI","Co-op vs. AI Beginner Bot games":"AI","Co-op vs. AI Intro Bot games":"AI","Co-op vs. AI Beginner Bot games":"AI","Co-op vs. AI Intermediate Bot games":"AI","Co-op vs. AI Intro Bot games":"AI","ARURF games":"URF","Legend of the Poro King games":"포로왕","Tutorial 1":"튜토리얼","Tutorial 2":"튜토리얼","Tutorial 3":"튜토리얼","One for All games":"단일","Nexus Blitz games":"돌격 넥서스"};async function ge(t){try{const r=(await(await fetch("https://static.developer.riotgames.com/docs/lol/queues.json")).json()).find(e=>e.queueId===t);if(r){const e=r.description;return fe[e]||"undefined"}else return console.error("Queue not found for queueId:",t),"undefined"}catch(n){return console.error("Failed to fetch queue data",n),"undefined"}}async function he(t){try{const r=(await(await fetch("https://static.developer.riotgames.com/docs/lol/maps.json")).json()).find(e=>e.mapId===t);if(r){const e=r.mapName;return pe[e]||"undefined"}else return console.error("Map not found for mapId:",t),"undefined"}catch(n){return console.error("Failed to fetch map data",n),"undefined"}}const ye={RANKED_SOLO_5x5:"솔로 랭크",RANKED_TEAM_5x5:"자유 랭크"},Ie=(t,n)=>{const a=t+n;return a===0?0:(t/a*100).toFixed(2)};function ve(t){const a=Date.now()-t,r=Math.floor(a/1e3),e=Math.floor(r/60),s=Math.floor(e/60),d=Math.floor(s/24),l=[];return d>0&&l.push(`${d}d`),s>0&&l.push(`${s%24}h`),e>0&&l.push(`${e%60}m`),l.length>0?l.join(" ")+" before":"방금"}const $e={IRON:"#8B5C83",BRONZE:"#C7A76D",SILVER:"#A7A8AA",GOLD:"#FFD700",PLATINUM:"#2E85C4",DIAMOND:"#B9E1E9",MASTER:"#DAA520",GRANDMASTER:"#F1C40F",CHALLENGER:"#E74C3C",UNRANKED:"#808080"};function Ee(t,n){let a=n;["CHALLENGER","GRANDMASTER","MASTER"].includes(t)&&n==="I"&&(a="I");const r=$e[t]||"#808080";return[a,r]}async function we(t,n,a,r){const e=document.getElementById(`SummonerIcon-${n}_${a}`),s=document.createElement("div");if(s.className="Summoner-div",!e){console.error(`Summoner icon element not found for match ${n}`);return}if(e.style.width="30px",e.style.height="30px",t===0){e.src="../data/img/empty/empty-icon.png",e.alt="get Summoner error";return}try{const l=await(await fetch(`https://ddragon.leagueoflegends.com/cdn/${r}/data/ko_KR/summoner.json`)).json(),i=Object.values(l.data).find(p=>p.key===String(t));if(i){const p=`https://ddragon.leagueoflegends.com/cdn/${r}/img/spell/${i.image.full}`;e.src=p,e.alt=`${i.name} Icon`}else console.error(`Summoner spell not found for SummonerNum ${t}`),e.src="../data/img/empty/empty-icon.png",e.alt="get Summoner error"}catch(d){console.error("Error fetching summoner spell data:",d),e.src="../data/img/empty/empty-icon.png",e.alt="get Summoner error"}}async function F(t,n,a,r){const e=document.getElementById(`RuneIcon-${n}_${a}-${a===0?"main":"sub"}`);if(!e){console.error(`Rune icon element not found for match ${n}`);return}if(e.style.width="30px",e.style.height="30px",t===0||t==="undefined"){e.src="../data/img/empty/empty-icon.png",e.alt="get Rune error";return}try{const d=await(await fetch(`https://ddragon.leagueoflegends.com/cdn/${r}/data/ko_KR/runesReforged.json`)).json();let l;if(a===0?d.forEach(i=>{i.slots.forEach(p=>{p.runes.forEach(h=>{h.id===t&&(l=h)})})}):l=d.find(i=>i.id===t),l){const i=`https://ddragon.leagueoflegends.com/cdn/img/${l.icon}`;e.src=i,e.alt=`${l.name} Icon`}else console.error(`Rune not found for runNum ${t}`),e.src="../data/img/empty/empty-icon.png",e.alt="get Rune error"}catch(s){console.error("Error fetching rune data:",s),e.src="../data/img/empty/empty-icon.png",e.alt="get Rune error"}}const Re="RGAPI-b9406919-3132-4259-a5d7-5da1ea90d102",$={"User-Agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.107 Safari/537.36","Accept-Language":"ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7","Accept-Charset":"application/x-www-form-urlencoded; charset=UTF-8",Origin:"https://developer.riotgames.com","X-Riot-Token":Re},H=ce,W=le,Se=encodeURIComponent(H);document.getElementById("gameName").innerText=H;document.getElementById("tagLine").innerText=W;async function Q(){var K,U,j,O;console.log("전적 데이터를 가져옵니다.");const t=await me(),n=await fetch(`https://cors-anywhere.herokuapp.com/https://asia.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${Se}/${W}`,{method:"GET",headers:$});if(!n.ok){console.log("Response status:",n.status);const u=await n.text();throw console.error("Error response:",u),new Error(u)}const r=(await n.json()).puuid,e=await fetch(`https://cors-anywhere.herokuapp.com/https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/${r}`,{method:"GET",headers:$});if(!e.ok){console.log("Response status:",e.status);const u=await e.text();throw console.error("Error response:",u),new Error(u)}const s=await e.json(),d=s.profileIconId,l=`https://ddragon.leagueoflegends.com/cdn/${t}/img/profileicon/${d}.png`,i=document.getElementById("profileIcon");i.src=l,i.alt="Profile Icon",document.querySelector("#profileIcon").style.display="block";const p=await fetch(`https://cors-anywhere.herokuapp.com/https://kr.api.riotgames.com/lol/league/v4/entries/by-summoner/${s.id}`,{method:"GET",headers:$});if(!p.ok){console.log("Response status:",p.status);const u=await p.text();throw console.error("Error response:",u),new Error(u)}const h=await p.json(),C=h[0].tier||"unranked",[,b]=Ee(C,h[0].rank)||"",V=((K=h[0])==null?void 0:K.leaguePoints)||0,k=((U=h[0])==null?void 0:U.wins)||0,T=((j=h[0])==null?void 0:j.losses)||0,z=Ie(k,T),X=ye[(O=h[0])==null?void 0:O.queueType]||"",Z=s.summonerLevel,M=document.getElementById("tier"),N=document.getElementById("rank");M.style.color=b,N.style.color=b;const J=`./data/img/rank/Rank=${C}.png`;document.getElementById("queueType").innerText=X,M.innerText=C,N.innerText=h[0].rank,document.getElementById("leaguePoints").innerText=V+"LP",document.getElementById("wins").innerText=k+" 승",document.getElementById("losses").innerText=T+" 패",document.getElementById("winRate").innerText=z+"%",document.getElementById("summonerLevel").innerText=Z,document.querySelector(".rank-info p:nth-child(1)").style.display="block",document.querySelector(".rank-info p:nth-child(2)").style.display="block",document.querySelector("#summonerLevel").style.display="block",i.addEventListener("mouseover",()=>{i.classList.add("hovered"),i.src=J}),i.addEventListener("mouseout",()=>{i.classList.remove("hovered"),setTimeout(()=>{i.src=l},1)});const P=k+T,q=Math.floor(P/100),Y=P%100,A=[];for(let u=0;u<=q;u++){const G=u*100,I=await fetch(`https://cors-anywhere.herokuapp.com/https://asia.api.riotgames.com/lol/match/v5/matches/by-puuid/${r}/ids?start=${G}&count=${u!==q?100:Y}`,{headers:$});if(!I.ok){console.log("Response status:",I.status);const m=await I.text();throw console.error("Error response:",m),new Error(m)}const f=await I.json();A.push(...f)}if(A.length>0){const u=A.slice(0,6).map(async f=>{const m=await fetch(`https://cors-anywhere.herokuapp.com/https://asia.api.riotgames.com/lol/match/v5/matches/${f}`,{headers:$});if(!m.ok){const y=await m.text();return console.error("Error response:",y),null}return await m.json()}),_=(await Promise.all(u)).filter(f=>f!==null),I=document.getElementById("recent-matches");I.innerHTML="",_.forEach(async(f,m)=>{const y=ie(f,r);if(!y){console.log("Participant not found for puuid:",r);return}const o=y.participant,v=document.createElement("div");v.className="match-item";const ee=await ge(f.info.queueId),te=await he(f.info.mapId),oe=ve(f.info.gameEndTimestamp);v.innerHTML=`
 <div >

  <div class="Top-matchInfo">
    <div class="time-box">
      ${oe}
    </div>
       <div class="result-box ${y.win?"win":"lose"}">
        <p>${y.win?"승리":"패배"}</p>
      </div>
          </div>
    <div class="matchInfo-box">
      <div class="champProfileBox">
        <img id="championIcon-${m}" alt="${o.championName} Icon" />
        <p class="matchChampLevel">Level : ${o.champLevel}</p>
      </div>
      <div class="textInfo-box">
        <div class="queueWinLose">
          <p >${ee}</p>
          <p style="color: ${y.win?"green":"red"}; font-weight:"bold"">
            ${y.win?"승리":"패배"}
       <p class="timestamp">
  ${String(Math.floor(f.info.gameDuration/60)).padStart(2,"0")}:${String(f.info.gameDuration%60).padStart(2,"0")}
</p>

        </div>
   
        <!--<p>${te}</p>-->
        <div class="kda-box">
        <div class ="kda">
        <p>${o.kills}</p>
        <p>/</p>
        <p>${o.deaths}</p>
           <p>/</p>
        <p>${o.assists}</p>
        </div>
        
       <p class="kda-per" >( ${o.deaths>0?((o.kills+o.assists)/o.deaths).toFixed(2):"Perfect KDA"}:1 )</p> 
</div>
         <!-- <p>Gold ${o.goldEarned}</p>-->
      </div>
    </div>
  </div>
`,de(o.championName,m,t);const L=document.createElement("div");L.className="item-container";for(let c=0;c<6;c++){const g=document.createElement("img");g.id=`ItemIcon-${m}_${c}`,g.alt=`Item ${c}`,L.appendChild(g)}v.appendChild(L),I.appendChild(v);for(let c=0;c<6;c++)await ue(o[`item${c}`],m,c,t);const E=document.createElement("div");E.className="SR-container";const B=document.createElement("div");B.className="summoner-container";for(let c=0;c<2;c++){const g=document.createElement("img");g.id=`SummonerIcon-${m}_${c}`,g.alt=`Summoner ${c+1}`,B.appendChild(g)}const D=document.createElement("div");D.className="rune-container";for(let c=0;c<2;c++){const g=document.createElement("img");g.id=`RuneIcon-${m}_${c}-${c===0?"main":"sub"}`,g.alt=`Rune ${c===0?"Main":"Sub"}`,D.appendChild(g)}E.appendChild(B),E.appendChild(D);const ne=v.querySelector(".matchInfo-box"),se=v.querySelector(".champProfileBox");ne.insertBefore(E,se.nextSibling);for(let c=0;c<2;c++)await we(o[`summoner${c+1}Id`],m,c,t);const ae=o.perks.styles[0].selections[0].perk,re=o.perks.styles[1].style;await F(ae,m,0,t),await F(re,m,1,t),v.innerHTML+=`
      <div>
        <div style="text-align: right;">
        <button class="toggle-details">open</button>
    </div>
      <div class="match-details" style="display: none;">
   <p style="text-align:left; margin-top: 1vw; font-size: 1.5em; ">상세 전적 정보</p>
  <table class="match-info-table">
  <tr><td class="header">포지션</td><td class="note-info-td">${o.teamPosition}</td></tr>
  <tr><td class="header">챔피언 경험치</td><td class="value">${o.champExperience}</td></tr>
  <tr><td class="header">제어 와드 설치</td><td class="value">${o.detectorWardsPlaced}</td></tr>
  <tr><td class="header">골드 획득</td><td class="value">${o.goldEarned}</td></tr>
  <tr><td class="header">골드 사용</td><td class="value">${o.goldSpent}</td></tr>
  <tr><td class="header">아이템 구매</td><td class="value">${o.itemsPurchased}</td></tr>
  <tr><td class="header">스킬 사용 횟수</td><td class="value">${o.spell1Casts+o.spell2Casts+o.spell3Casts+o.spell4Casts}</td></tr>
  <tr><td class="header">학살중입니다 콜 횟수</td><td class="value">${o.killingSprees}</td></tr>
  <tr><td class="header">최대 연속 처치</td><td class="value">${o.largestKillingSpree}</td></tr>
  <tr><td class="header">입힌 데미지 총합</td><td class="value">${o.totalDamageDealt}</td></tr>
  <tr><td class="header">챔피언에게 입힌 데미지</td><td class="value">${o.totalDamageDealtToChampions}</td></tr>
  <tr><td class="header">받은 데미지 총합</td><td class="value">${o.totalDamageTaken}</td></tr>
  <tr><td class="header">마법 피해 총량</td><td class="value">${o.magicDamageDealt}</td></tr>
  <tr><td class="header">챔피언에게 입힌 마법 피해</td><td class="value">${o.magicDamageDealtToChampions}</td></tr>
  <tr><td class="header">입은 마법 피해</td><td class="value">${o.magicDamageTaken}</td></tr>
  <tr><td class="header">힐 총합</td><td class="value">${o.totalHeal}</td></tr>
  <tr><td class="header">팀원에게 힐 총합</td><td class="value">${o.totalHealsOnTeammates}</td></tr>
  <tr><td class="header">총 미니언 처치 수</td><td class="value">${o.totalMinionsKilled}</td></tr>
  <tr><td class="header">첫 킬 어시스트</td><td class="value">${o.firstKillAssist?"예":"아니오"}</td></tr>
  <tr><td class="header">FirstBlood</td><td class="value">${o.firstBlood?"예":"아니오"}</td></tr>
  <tr><td class="header">킬</td><td class="note-info-td" >${o.kills}</td></tr>
  <tr><td class="header">죽음</td><td class="note-info-td">${o.deaths}</td></tr>
  <tr><td class="header">드래곤 킬</td><td class="value">${o.dragonKills}</td></tr>
  <tr><td class="header">바론 킬</td><td class="value">${o.baronKills}</td></tr>
  <tr><td class="header">포탑 킬</td><td class="value">${o.turretKills}</td></tr>
  <tr><td class="header">첫 포탑킬</td><td class="value">${o.firstTowerKill}</td></tr>
  <tr><td class="header">첫 포탑킬 어시스트</td><td class="value">${o.firstTowerAssist}</td></tr>
  <tr><td class="header">총 어시스트</td><td class="note-info-td">${o.assists}</td></tr>
  <tr><td class="header">최대 치명타</td><td class="value">${o.largestCriticalStrike}</td></tr>
  <tr><td class="header">최대 연속 킬 횟수</td><td class="value">${o.largestKillingSpree}</td></tr>
  <tr><td class="header">최대 다중 킬</td><td class="value">${o.largestMultiKill}</td></tr>
  <tr><td class="header">최장 생존 시간</td><td class="value">${o.longestTimeSpentLiving}</td></tr>
  <tr><td class="header">팀 승리 여부</td><td class="note-info-td">${o.win?"승리":"패배"}</td></tr>
</table>

      </div>
      </div>
  `})}}let x=!1;const R=document.getElementById("countdown"),S=document.getElementById("refreshButton");S.querySelector(".button-image");Q();const Ce=async()=>{if(x)return;x=!0,S.disabled=!0,await Q();let t=10;R.style.display="block",R.innerText=`재시도 가능: ${t}초`;const n=setInterval(()=>{t-=1,R.innerText=`재시도 가능: ${t}초`,t<=0&&(clearInterval(n),R.style.display="none",x=!1,S.disabled=!1)},1e3)};S.addEventListener("click",Ce);document.addEventListener("DOMContentLoaded",()=>{console.log("DOM fully loaded and parsed")});document.addEventListener("DOMContentLoaded",function(){console.log("광고 클릭");const t=document.querySelector(".close-ad"),n=document.querySelector(".ad-banner");t.addEventListener("click",function(){n.style.display="none"})});document.addEventListener("DOMContentLoaded",function(){document.getElementById("recent-matches").addEventListener("click",function(n){if(n.target.classList.contains("toggle-details")){const a=n.target.closest("div").nextElementSibling;a.classList.contains("open")?(a.classList.remove("open"),n.target.textContent="open",a.style.display="none"):(a.classList.add("open"),n.target.textContent="close",a.style.display="block")}}),document.addEventListener("click",function(n){!n.target.closest(".toggle-details")&&!n.target.closest(".match-details")&&document.querySelectorAll(".match-details.open").forEach(r=>{r.classList.remove("open"),r.previousElementSibling.querySelector(".toggle-details").textContent="open",r.style.display="none"})})});
