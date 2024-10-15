(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))r(e);new MutationObserver(e=>{for(const s of e)if(s.type==="childList")for(const d of s.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&r(d)}).observe(document,{childList:!0,subtree:!0});function a(e){const s={};return e.integrity&&(s.integrity=e.integrity),e.referrerPolicy&&(s.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?s.credentials="include":e.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function r(e){if(e.ep)return;e.ep=!0;const s=a(e);fetch(e.href,s)}})();const de="전세민",me="KR1";function ue(t,o){const a=t.info.participants.find(s=>s.puuid===o);if(!a)return null;const r=a.teamId,e=t.info.teams.find(s=>s.teamId===r);return e?{teamId:e.teamId,win:e.win,participant:a,participants:[t.info.participant]}:null}async function pe(t,o,a){const s=(await(await fetch(`https://ddragon.leagueoflegends.com/cdn/${a}/data/ko_KR/champion.json`)).json()).data[t];if(s){const d=`https://ddragon.leagueoflegends.com/cdn/${a}/img/champion/${s.image.full}`,l=document.getElementById(`championIcon-${o}`);l?(l.src=d,l.alt=`${s.name} Icon`):console.error(`Champion icon element not found for match ${o}`)}else console.error("Champion not found.")}let R=null;async function fe(){return R||(R=(await(await fetch("https://ddragon.leagueoflegends.com/api/versions.json")).json())[0],R)}async function he(t,o,a,r){const e=document.getElementById(`ItemIcon-${o}_${a}`),s=document.createElement("div");if(s.className="Item-div",!e){console.error(`Item icon element not found for match ${o}`);return}e.style.width="30px",e.style.height="30px",t===0&&(e.src=require("./data/img/empty/empty-icon.png"),e.alt="Empty Item Slot");try{const i=(await(await fetch(`https://ddragon.leagueoflegends.com/cdn/${r}/data/ko_KR/item.json`)).json()).data[t];if(i){const p=`https://ddragon.leagueoflegends.com/cdn/${r}/img/item/${t}.png`;e.src=p,e.alt=`${i.name} Icon`}else console.error(`Item not found for ItemNum ${t}`),e.src=require("./data/img/empty/empty-icon.png"),e.alt="Empty Item Slot"}catch(d){console.error("Error fetching item data:",d),e.src=require("./data/img/empty/empty-icon.png"),e.alt="Empty Item Slot"}}const ge={"Summoner's Rift":"소환사의 협곡","The Proving Grounds":"The Proving Grounds","Twisted Treeline":"뒤틀린 숲","The Crystal Scar":"수정의 상처","Howling Abyss":"칼바람 나락","Butcher's Bridge":"Butcher's Bridge","Cosmic Ruins":"Cosmic Ruins","Valoran City Park":"Valoran City Park","Substructure 43":"Substructure 43","Crash Site":"Crash Site","Nexus Blitz":"돌격 넥서스","Rings of Wrath":"Rings of Wrath"},ye={"Custom games":"커스텀 게임","Normal (Quickplay)":"일반","5v5 Draft Pick games":"일반","5v5 Blind Pick games":"일반","5v5 Ranked Solo games":"솔로 랭크","5v5 ARAM games":"무작위 총력전","5v5 Ranked Flex games":"자유 랭크","Summoner's Rift Clash games":"격전","ARAM Clash games":"격전","Co-op vs. AI Intermediate Bot games":"AI","Co-op vs. AI Intro Bot games":"AI","Co-op vs. AI Beginner Bot games":"AI","Co-op vs. AI Intro Bot games":"AI","Co-op vs. AI Beginner Bot games":"AI","Co-op vs. AI Intermediate Bot games":"AI","Co-op vs. AI Intro Bot games":"AI","ARURF games":"URF","Legend of the Poro King games":"포로왕","Tutorial 1":"튜토리얼","Tutorial 2":"튜토리얼","Tutorial 3":"튜토리얼","One for All games":"단일","Nexus Blitz games":"돌격 넥서스"};async function Ie(t){try{const r=(await(await fetch("https://static.developer.riotgames.com/docs/lol/queues.json")).json()).find(e=>e.queueId===t);if(r){const e=r.description;return ye[e]||"undefined"}else return console.error("Queue not found for queueId:",t),"undefined"}catch(o){return console.error("Failed to fetch queue data",o),"undefined"}}async function ve(t){try{const r=(await(await fetch("https://static.developer.riotgames.com/docs/lol/maps.json")).json()).find(e=>e.mapId===t);if(r){const e=r.mapName;return ge[e]||"undefined"}else return console.error("Map not found for mapId:",t),"undefined"}catch(o){return console.error("Failed to fetch map data",o),"undefined"}}const $e={RANKED_SOLO_5x5:"솔로 랭크",RANKED_TEAM_5x5:"자유 랭크"},Ee=(t,o)=>{const a=t+o;return a===0?0:(t/a*100).toFixed(2)};function we(t){const a=Date.now()-t,r=Math.floor(a/1e3),e=Math.floor(r/60),s=Math.floor(e/60),d=Math.floor(s/24),l=[];return d>0&&l.push(`${d}d`),s>0&&l.push(`${s%24}h`),e>0&&l.push(`${e%60}m`),l.length>0?l.join(" ")+" before":"방금"}const Re={IRON:"#8B5C83",BRONZE:"#C7A76D",SILVER:"#A7A8AA",GOLD:"#FFD700",PLATINUM:"#2E85C4",DIAMOND:"#B9E1E9",MASTER:"#DAA520",GRANDMASTER:"#F1C40F",CHALLENGER:"#E74C3C",UNRANKED:"#808080"};function Se(t,o){let a=o;["CHALLENGER","GRANDMASTER","MASTER"].includes(t)&&o==="I"&&(a="I");const r=Re[t]||"#808080";return[a,r]}async function Ce(t,o,a,r){const e=document.getElementById(`SummonerIcon-${o}_${a}`),s=document.createElement("div");if(s.className="Summoner-div",!e){console.error(`Summoner icon element not found for match ${o}`);return}if(e.style.width="30px",e.style.height="30px",t===0){e.src=require("./data/img/empty/empty-icon.png"),e.alt="get Summoner error";return}try{const l=await(await fetch(`https://ddragon.leagueoflegends.com/cdn/${r}/data/ko_KR/summoner.json`)).json(),i=Object.values(l.data).find(p=>p.key===String(t));if(i){const p=`https://ddragon.leagueoflegends.com/cdn/${r}/img/spell/${i.image.full}`;e.src=p,e.alt=`${i.name} Icon`}else console.error(`Summoner spell not found for SummonerNum ${t}`),e.src=require("./data/img/empty/empty-icon.png"),e.alt="get Summoner error"}catch(d){console.error("Error fetching summoner spell data:",d),e.src=require("./data/img/empty/empty-icon.png"),e.alt="get Summoner error"}}async function W(t,o,a,r){const e=document.getElementById(`RuneIcon-${o}_${a}-${a===0?"main":"sub"}`);if(!e){console.error(`Rune icon element not found for match ${o}`);return}if(e.style.width="30px",e.style.height="30px",t===0||t==="undefined"){e.src="/data/img/empty/empty-icon.png",e.alt="get Rune error";return}try{const d=await(await fetch(`https://ddragon.leagueoflegends.com/cdn/${r}/data/ko_KR/runesReforged.json`)).json();let l;if(a===0?d.forEach(i=>{i.slots.forEach(p=>{p.runes.forEach(g=>{g.id===t&&(l=g)})})}):l=d.find(i=>i.id===t),l){const i=`https://ddragon.leagueoflegends.com/cdn/img/${l.icon}`;e.src=i,e.alt=`${l.name} Icon`}else console.error(`Rune not found for runNum ${t}`),e.src=require("./data/img/empty/empty-icon.png"),e.alt="get Rune error"}catch(s){console.error("Error fetching rune data:",s),e.src=require("./data/img/empty/empty-icon.png"),e.alt="get Rune error"}}const Te="RGAPI-b9406919-3132-4259-a5d7-5da1ea90d102",V="https://kr.api.riotgames.com/",b="https://asia.api.riotgames.com/",$="https://cors-anywhere.herokuapp.com/",E={"User-Agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.107 Safari/537.36","Accept-Language":"ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7","Accept-Charset":"application/x-www-form-urlencoded; charset=UTF-8",Origin:"https://developer.riotgames.com","X-Riot-Token":Te},Q=de,z=me,ke=encodeURIComponent(Q);document.getElementById("gameName").innerText=Q;document.getElementById("tagLine").innerText=z;async function X(){var j,O,G,_;console.log("전적 데이터를 가져옵니다.");const t=await fe(),o=await fetch(`${$}${b}/riot/account/v1/accounts/by-riot-id/${ke}/${z}`,{method:"GET",headers:E});if(!o.ok){console.log("Response status:",o.status);const u=await o.text();throw console.error("Error response:",u),new Error(u)}const r=(await o.json()).puuid,e=await fetch(`${$}${V}/lol/summoner/v4/summoners/by-puuid/${r}`,{method:"GET",headers:E});if(!e.ok){console.log("Response status:",e.status);const u=await e.text();throw console.error("Error response:",u),new Error(u)}const s=await e.json(),d=s.profileIconId,l=`https://ddragon.leagueoflegends.com/cdn/${t}/img/profileicon/${d}.png`,i=document.getElementById("profileIcon");i.src=l,i.alt="Profile Icon",document.querySelector("#profileIcon").style.display="block";const p=await fetch(`${$}${V}/lol/league/v4/entries/by-summoner/${s.id}`,{method:"GET",headers:E});if(!p.ok){console.log("Response status:",p.status);const u=await p.text();throw console.error("Error response:",u),new Error(u)}const g=await p.json(),T=g[0].tier||"unranked",[,M]=Se(T,g[0].rank)||"",Y=((j=g[0])==null?void 0:j.leaguePoints)||0,k=((O=g[0])==null?void 0:O.wins)||0,A=((G=g[0])==null?void 0:G.losses)||0,Z=Ee(k,A),J=$e[(_=g[0])==null?void 0:_.queueType]||"",ee=s.summonerLevel,N=document.getElementById("tier"),P=document.getElementById("rank");N.style.color=M,P.style.color=M;const te=require(`./data/img/rank/Rank=${T}.png`);document.getElementById("queueType").innerText=J,N.innerText=T,P.innerText=g[0].rank,document.getElementById("leaguePoints").innerText=Y+"LP",document.getElementById("wins").innerText=k+" 승",document.getElementById("losses").innerText=A+" 패",document.getElementById("winRate").innerText=Z+"%",document.getElementById("summonerLevel").innerText=ee,document.querySelector(".rank-info p:nth-child(1)").style.display="block",document.querySelector(".rank-info p:nth-child(2)").style.display="block",document.querySelector("#summonerLevel").style.display="block",i.addEventListener("mouseover",()=>{i.classList.add("hovered"),i.src=te}),i.addEventListener("mouseout",()=>{i.classList.remove("hovered"),setTimeout(()=>{i.src=l},1)});const K=k+A,U=Math.floor(K/100),ne=K%100,L=[];for(let u=0;u<=U;u++){const F=u*100,I=await fetch(`${$}${b}/lol/match/v5/matches/by-puuid/${r}/ids?start=${F}&count=${u!==U?100:ne}`,{headers:E});if(!I.ok){console.log("Response status:",I.status);const m=await I.text();throw console.error("Error response:",m),new Error(m)}const f=await I.json();L.push(...f)}if(L.length>0){const u=L.slice(0,6).map(async f=>{const m=await fetch(`${$}${b}/lol/match/v5/matches/${f}`,{headers:E});if(!m.ok){const y=await m.text();return console.error("Error response:",y),null}return await m.json()}),H=(await Promise.all(u)).filter(f=>f!==null),I=document.getElementById("recent-matches");I.innerHTML="",H.forEach(async(f,m)=>{const y=ue(f,r);if(!y){console.log("Participant not found for puuid:",r);return}const n=y.participant,v=document.createElement("div");v.className="match-item";const oe=await Ie(f.info.queueId),se=await ve(f.info.mapId),ae=we(f.info.gameEndTimestamp);v.innerHTML=`
 <div >

  <div class="Top-matchInfo">
    <div class="time-box">
      ${ae}
    </div>
       <div class="result-box ${y.win?"win":"lose"}">
        <p>${y.win?"승리":"패배"}</p>
      </div>
          </div>
    <div class="matchInfo-box">
      <div class="champProfileBox">
        <img id="championIcon-${m}" alt="${n.championName} Icon" />
        <p class="matchChampLevel">Level : ${n.champLevel}</p>
      </div>
      <div class="textInfo-box">
        <div class="queueWinLose">
          <p >${oe}</p>
          <p style="color: ${y.win?"green":"red"}; font-weight:"bold"">
            ${y.win?"승리":"패배"}
       <p class="timestamp">
  ${String(Math.floor(f.info.gameDuration/60)).padStart(2,"0")}:${String(f.info.gameDuration%60).padStart(2,"0")}
</p>

        </div>
   
        <!--<p>${se}</p>-->
        <div class="kda-box">
        <div class ="kda">
        <p>${n.kills}</p>
        <p>/</p>
        <p>${n.deaths}</p>
           <p>/</p>
        <p>${n.assists}</p>
        </div>
        
       <p class="kda-per" >( ${n.deaths>0?((n.kills+n.assists)/n.deaths).toFixed(2):"Perfect KDA"}:1 )</p> 
</div>
         <!-- <p>Gold ${n.goldEarned}</p>-->
      </div>
    </div>
  </div>
`,pe(n.championName,m,t);const B=document.createElement("div");B.className="item-container";for(let c=0;c<6;c++){const h=document.createElement("img");h.id=`ItemIcon-${m}_${c}`,h.alt=`Item ${c}`,B.appendChild(h)}v.appendChild(B),I.appendChild(v);for(let c=0;c<6;c++)await he(n[`item${c}`],m,c,t);const w=document.createElement("div");w.className="SR-container";const D=document.createElement("div");D.className="summoner-container";for(let c=0;c<2;c++){const h=document.createElement("img");h.id=`SummonerIcon-${m}_${c}`,h.alt=`Summoner ${c+1}`,D.appendChild(h)}const x=document.createElement("div");x.className="rune-container";for(let c=0;c<2;c++){const h=document.createElement("img");h.id=`RuneIcon-${m}_${c}-${c===0?"main":"sub"}`,h.alt=`Rune ${c===0?"Main":"Sub"}`,x.appendChild(h)}w.appendChild(D),w.appendChild(x);const re=v.querySelector(".matchInfo-box"),ce=v.querySelector(".champProfileBox");re.insertBefore(w,ce.nextSibling);for(let c=0;c<2;c++)await Ce(n[`summoner${c+1}Id`],m,c,t);const le=n.perks.styles[0].selections[0].perk,ie=n.perks.styles[1].style;await W(le,m,0,t),await W(ie,m,1,t),v.innerHTML+=`
      <div>
        <div style="text-align: right;">
        <button class="toggle-details">open</button>
    </div>
      <div class="match-details" style="display: none;">
   <p style="text-align:left; margin-top: 1vw; font-size: 1.5em; ">상세 전적 정보</p>
  <table class="match-info-table">
  <tr><td class="header">포지션</td><td class="note-info-td">${n.teamPosition}</td></tr>
  <tr><td class="header">챔피언 경험치</td><td class="value">${n.champExperience}</td></tr>
  <tr><td class="header">제어 와드 설치</td><td class="value">${n.detectorWardsPlaced}</td></tr>
  <tr><td class="header">골드 획득</td><td class="value">${n.goldEarned}</td></tr>
  <tr><td class="header">골드 사용</td><td class="value">${n.goldSpent}</td></tr>
  <tr><td class="header">아이템 구매</td><td class="value">${n.itemsPurchased}</td></tr>
  <tr><td class="header">스킬 사용 횟수</td><td class="value">${n.spell1Casts+n.spell2Casts+n.spell3Casts+n.spell4Casts}</td></tr>
  <tr><td class="header">학살중입니다 콜 횟수</td><td class="value">${n.killingSprees}</td></tr>
  <tr><td class="header">최대 연속 처치</td><td class="value">${n.largestKillingSpree}</td></tr>
  <tr><td class="header">입힌 데미지 총합</td><td class="value">${n.totalDamageDealt}</td></tr>
  <tr><td class="header">챔피언에게 입힌 데미지</td><td class="value">${n.totalDamageDealtToChampions}</td></tr>
  <tr><td class="header">받은 데미지 총합</td><td class="value">${n.totalDamageTaken}</td></tr>
  <tr><td class="header">마법 피해 총량</td><td class="value">${n.magicDamageDealt}</td></tr>
  <tr><td class="header">챔피언에게 입힌 마법 피해</td><td class="value">${n.magicDamageDealtToChampions}</td></tr>
  <tr><td class="header">입은 마법 피해</td><td class="value">${n.magicDamageTaken}</td></tr>
  <tr><td class="header">힐 총합</td><td class="value">${n.totalHeal}</td></tr>
  <tr><td class="header">팀원에게 힐 총합</td><td class="value">${n.totalHealsOnTeammates}</td></tr>
  <tr><td class="header">총 미니언 처치 수</td><td class="value">${n.totalMinionsKilled}</td></tr>
  <tr><td class="header">첫 킬 어시스트</td><td class="value">${n.firstKillAssist?"예":"아니오"}</td></tr>
  <tr><td class="header">FirstBlood</td><td class="value">${n.firstBlood?"예":"아니오"}</td></tr>
  <tr><td class="header">킬</td><td class="note-info-td" >${n.kills}</td></tr>
  <tr><td class="header">죽음</td><td class="note-info-td">${n.deaths}</td></tr>
  <tr><td class="header">드래곤 킬</td><td class="value">${n.dragonKills}</td></tr>
  <tr><td class="header">바론 킬</td><td class="value">${n.baronKills}</td></tr>
  <tr><td class="header">포탑 킬</td><td class="value">${n.turretKills}</td></tr>
  <tr><td class="header">첫 포탑킬</td><td class="value">${n.firstTowerKill}</td></tr>
  <tr><td class="header">첫 포탑킬 어시스트</td><td class="value">${n.firstTowerAssist}</td></tr>
  <tr><td class="header">총 어시스트</td><td class="note-info-td">${n.assists}</td></tr>
  <tr><td class="header">최대 치명타</td><td class="value">${n.largestCriticalStrike}</td></tr>
  <tr><td class="header">최대 연속 킬 횟수</td><td class="value">${n.largestKillingSpree}</td></tr>
  <tr><td class="header">최대 다중 킬</td><td class="value">${n.largestMultiKill}</td></tr>
  <tr><td class="header">최장 생존 시간</td><td class="value">${n.longestTimeSpentLiving}</td></tr>
  <tr><td class="header">팀 승리 여부</td><td class="note-info-td">${n.win?"승리":"패배"}</td></tr>
</table>

      </div>
      </div>
  `})}}let q=!1;const S=document.getElementById("countdown"),C=document.getElementById("refreshButton");C.querySelector(".button-image");X();const Ae=async()=>{if(q)return;q=!0,C.disabled=!0,await X();let t=10;S.style.display="block",S.innerText=`재시도 가능: ${t}초`;const o=setInterval(()=>{t-=1,S.innerText=`재시도 가능: ${t}초`,t<=0&&(clearInterval(o),S.style.display="none",q=!1,C.disabled=!1)},1e3)};C.addEventListener("click",Ae);document.addEventListener("DOMContentLoaded",()=>{console.log("DOM fully loaded and parsed")});document.addEventListener("DOMContentLoaded",function(){console.log("광고 클릭");const t=document.querySelector(".close-ad"),o=document.querySelector(".ad-banner");t.addEventListener("click",function(){o.style.display="none"})});document.addEventListener("DOMContentLoaded",function(){document.getElementById("recent-matches").addEventListener("click",function(o){if(o.target.classList.contains("toggle-details")){const a=o.target.closest("div").nextElementSibling;a.classList.contains("open")?(a.classList.remove("open"),o.target.textContent="open",a.style.display="none"):(a.classList.add("open"),o.target.textContent="close",a.style.display="block")}}),document.addEventListener("click",function(o){!o.target.closest(".toggle-details")&&!o.target.closest(".match-details")&&document.querySelectorAll(".match-details.open").forEach(r=>{r.classList.remove("open"),r.previousElementSibling.querySelector(".toggle-details").textContent="open",r.style.display="none"})})});
