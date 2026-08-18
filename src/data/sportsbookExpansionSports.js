export const SPORTSBOOK_EXPANSION_TABS = [
  { key: "soccer", label: "Soccer" },
  { key: "tennis", label: "Tennis" },
  { key: "ufc", label: "UFC" },
  { key: "nrl", label: "NRL" },
];

const NRL_TEAM_LOGOS = {
  broncos: "/images/sportsbook/nrl/broncos.png",
  cowboys: "/images/sportsbook/nrl/cowboys.png",
  roosters: "/images/sportsbook/nrl/roosters.png",
  rabbitohs: "/images/sportsbook/nrl/rabbitohs.png",
  panthers: "/images/sportsbook/nrl/panthers.png",
  storm: "/images/sportsbook/nrl/storm.png",
};

const COUNTRY_FLAG = (code) => `https://flagcdn.com/w40/${code}.png`;

const SOCCER_UPCOMING_MATCHES = [
  {
    id: "la-liga-1",
    competition: "Spain La Liga",
    date: "12 June 2026",
    time: "13:00",
    teams: [
      {
        name: "Real Madrid",
        logoSrc: "https://crests.football-data.org/86.png",
        logoAlt: "Real Madrid",
      },
      {
        name: "FC Barcelona",
        logoSrc: "https://crests.football-data.org/81.png",
        logoAlt: "FC Barcelona",
      },
    ],
    odds: [
      { label: "1", odds: "2.55" },
      { label: "X", odds: "3.20" },
      { label: "2", odds: "2.60" },
    ],
  },
  {
    id: "la-liga-2",
    competition: "Spain La Liga",
    date: "13 June 2026",
    time: "15:30",
    teams: [
      {
        name: "Atletico Madrid",
        logoSrc: "https://crests.football-data.org/78.png",
        logoAlt: "Atletico Madrid",
      },
      {
        name: "Sevilla FC",
        logoSrc: "https://crests.football-data.org/559.png",
        logoAlt: "Sevilla FC",
      },
    ],
    odds: [
      { label: "1", odds: "1.95" },
      { label: "X", odds: "3.40" },
      { label: "2", odds: "3.85" },
    ],
  },
  {
    id: "premier-league",
    competition: "English Premier League",
    date: "14 June 2026",
    time: "06:00",
    teams: [
      {
        name: "Liverpool FC",
        logoSrc: "https://crests.football-data.org/64.png",
        logoAlt: "Liverpool FC",
      },
      {
        name: "Arsenal FC",
        logoSrc: "https://crests.football-data.org/57.png",
        logoAlt: "Arsenal FC",
      },
    ],
    odds: [
      { label: "1", odds: "1.87" },
      { label: "X", odds: "2.11" },
      { label: "2", odds: "3.21" },
    ],
  },
];

export const SPORTSBOOK_EXPANSION_SPORTS = {
  soccer: {
    game: { label: "FCPlus", icon: "soccer" },
    heroVideoSrc: "/videos/home-video.mp4",
    heroTitle: "Expert Match Picks",
    heroBody:
      "Expert-selected matches from the world's leading football leagues, presented as a curated daily card of games.",
    availabilityCount: 12,
    upcomingTitle: "Upcoming Matches",
    liveMatch: {
      competition: "FIFA World Cup",
      minutesPlayed: 24,
      teams: [
        {
          name: "Brazil",
          logoSrc: "https://crests.football-data.org/764.svg",
          logoAlt: "Brazil",
          score: 0,
        },
        {
          name: "France",
          logoSrc: "https://crests.football-data.org/773.svg",
          logoAlt: "France",
          score: 2,
        },
      ],
    },
    upcomingMatches: SOCCER_UPCOMING_MATCHES,
  },
  tennis: {
    game: { label: "Tennis", icon: "tennis" },
    heroVideoSrc: "/videos/sportsbook-hero-tennis.mp4",
    heroTitle: "Tournament Picks",
    heroBody:
      "Daily selections from ATP and WTA tournaments, balancing form, surface and value across every match.",
    availabilityCount: 9,
    upcomingTitle: "Upcoming Matches",
    liveMatch: {
      competition: "ATP Tour",
      minutesPlayed: 2,
      teams: [
        {
          name: "C. Alcaraz",
          logoSrc: COUNTRY_FLAG("es"),
          logoAlt: "Carlos Alcaraz",
          score: 1,
        },
        {
          name: "J. Sinner",
          logoSrc: COUNTRY_FLAG("it"),
          logoAlt: "Jannik Sinner",
          score: 0,
        },
      ],
    },
    upcomingMatches: [
      {
        id: "atp-miami",
        competition: "ATP Miami Open",
        date: "22 March 2026",
        time: "21:00",
        teams: [
          {
            name: "C. Alcaraz",
            logoSrc: COUNTRY_FLAG("es"),
            logoAlt: "Carlos Alcaraz",
          },
          {
            name: "J. Sinner",
            logoSrc: COUNTRY_FLAG("it"),
            logoAlt: "Jannik Sinner",
          },
        ],
        odds: [
          { label: "1", odds: "1.72" },
          { label: "2", odds: "2.05" },
        ],
      },
      {
        id: "atp-monte-carlo",
        competition: "ATP Monte Carlo",
        date: "12 April 2026",
        time: "19:30",
        teams: [
          {
            name: "N. Djokovic",
            logoSrc: COUNTRY_FLAG("rs"),
            logoAlt: "Novak Djokovic",
          },
          {
            name: "A. de Minaur",
            logoSrc: COUNTRY_FLAG("au"),
            logoAlt: "Alex de Minaur",
          },
        ],
        odds: [
          { label: "1", odds: "1.55" },
          { label: "2", odds: "2.35" },
        ],
      },
      {
        id: "wta-madrid",
        competition: "WTA Madrid Open",
        date: "3 May 2026",
        time: "16:00",
        teams: [
          {
            name: "I. Swiatek",
            logoSrc: COUNTRY_FLAG("pl"),
            logoAlt: "Iga Swiatek",
          },
          {
            name: "C. Gauff",
            logoSrc: COUNTRY_FLAG("us"),
            logoAlt: "Coco Gauff",
          },
        ],
        odds: [
          { label: "1", odds: "1.48" },
          { label: "2", odds: "2.55" },
        ],
      },
    ],
  },
  ufc: {
    game: { label: "UFC", icon: "ufc" },
    heroVideoSrc: "/videos/sportsbook-hero-ufc.mp4",
    heroTitle: "Fight Night Picks",
    heroBody:
      "Analyst-selected fights across the main card, combining matchup analysis, recent form and betting value.",
    availabilityLabel: "6 Fights Available",
    upcomingTitle: "Upcoming Fights",
    liveMatch: {
      competition: "UFC 311",
      minutesPlayed: 3,
      teams: [
        {
          name: "Makhachev",
          logoSrc: COUNTRY_FLAG("ru"),
          logoAlt: "Islam Makhachev",
          score: 1,
        },
        {
          name: "Tsarukyan",
          logoSrc: COUNTRY_FLAG("am"),
          logoAlt: "Arman Tsarukyan",
          score: 0,
        },
      ],
    },
    upcomingMatches: [
      {
        id: "ufc-312",
        competition: "UFC 312",
        date: "8 February 2026",
        time: "12:00",
        teams: [
          {
            name: "Du Plessis",
            logoSrc: COUNTRY_FLAG("za"),
            logoAlt: "Dricus du Plessis",
          },
          {
            name: "Strickland",
            logoSrc: COUNTRY_FLAG("us"),
            logoAlt: "Sean Strickland",
          },
        ],
        odds: [
          { label: "1", odds: "1.65" },
          { label: "2", odds: "2.20" },
        ],
      },
      {
        id: "ufc-fight-night",
        competition: "UFC Fight Night",
        date: "15 March 2026",
        time: "10:00",
        teams: [
          {
            name: "Volkanovski",
            logoSrc: COUNTRY_FLAG("au"),
            logoAlt: "Alexander Volkanovski",
          },
          {
            name: "Lopes",
            logoSrc: COUNTRY_FLAG("br"),
            logoAlt: "Diego Lopes",
          },
        ],
        odds: [
          { label: "1", odds: "1.45" },
          { label: "2", odds: "2.70" },
        ],
      },
      {
        id: "ufc-313",
        competition: "UFC 313",
        date: "5 April 2026",
        time: "11:00",
        teams: [
          {
            name: "Pereira",
            logoSrc: COUNTRY_FLAG("br"),
            logoAlt: "Alex Pereira",
          },
          {
            name: "Ankalaev",
            logoSrc: COUNTRY_FLAG("ru"),
            logoAlt: "Magomed Ankalaev",
          },
        ],
        odds: [
          { label: "1", odds: "2.10" },
          { label: "2", odds: "1.72" },
        ],
      },
    ],
  },
  nrl: {
    game: { label: "NRL", icon: "nrl" },
    heroVideoSrc: "/videos/sportsbook-hero-nrl.mp4",
    heroTitle: "Round Picks",
    heroBody:
      "Weekly selections across the NRL, combining team form, player matchups and value before kickoff.",
    availabilityLabel: "10 Games Available",
    upcomingTitle: "Upcoming Matches",
    liveMatch: {
      competition: "NRL Premiership",
      minutesPlayed: 58,
      teams: [
        {
          name: "Panthers",
          logoSrc: NRL_TEAM_LOGOS.panthers,
          logoAlt: "Penrith Panthers",
          score: 18,
        },
        {
          name: "Storm",
          logoSrc: NRL_TEAM_LOGOS.storm,
          logoAlt: "Melbourne Storm",
          score: 12,
        },
      ],
    },
    upcomingMatches: [
      {
        id: "nrl-round-1",
        competition: "NRL Premiership",
        date: "6 March 2026",
        time: "19:30",
        teams: [
          {
            name: "Broncos",
            logoSrc: NRL_TEAM_LOGOS.broncos,
            logoAlt: "Brisbane Broncos",
          },
          {
            name: "Cowboys",
            logoSrc: NRL_TEAM_LOGOS.cowboys,
            logoAlt: "North Queensland Cowboys",
          },
        ],
        odds: [
          { label: "1", odds: "1.90" },
          { label: "2", odds: "1.95" },
        ],
      },
      {
        id: "nrl-round-2",
        competition: "NRL Premiership",
        date: "13 March 2026",
        time: "17:00",
        teams: [
          {
            name: "Roosters",
            logoSrc: NRL_TEAM_LOGOS.roosters,
            logoAlt: "Sydney Roosters",
          },
          {
            name: "Rabbitohs",
            logoSrc: NRL_TEAM_LOGOS.rabbitohs,
            logoAlt: "South Sydney Rabbitohs",
          },
        ],
        odds: [
          { label: "1", odds: "1.75" },
          { label: "2", odds: "2.05" },
        ],
      },
      {
        id: "nrl-round-3",
        competition: "NRL Premiership",
        date: "20 March 2026",
        time: "20:00",
        teams: [
          {
            name: "Panthers",
            logoSrc: NRL_TEAM_LOGOS.panthers,
            logoAlt: "Penrith Panthers",
          },
          {
            name: "Storm",
            logoSrc: NRL_TEAM_LOGOS.storm,
            logoAlt: "Melbourne Storm",
          },
        ],
        odds: [
          { label: "1", odds: "1.82" },
          { label: "2", odds: "1.98" },
        ],
      },
    ],
  },
};
