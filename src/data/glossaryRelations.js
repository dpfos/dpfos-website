/*
==========================================================
DPF OS — MASTER FOOTBALL KNOWLEDGE GLOSSARY
==========================================================

Purpose
-------
This file is the structured vocabulary layer of DPF OS.

It is NOT protected book content.
It is NOT a replacement for the DPF OS books.

It provides searchable football concepts that allow the
DPF OS Search Engine to understand the language of the game.

Current scope
-------------
01. Game Fundamentals
02. Game Phases
03. Tactical Principles
04. Possession
05. Build-Up
06. Progression
07. Final Third
08. Defensive Organisation
09. Pressing
10. Transitions
11. Defensive Line
12. Positional Play
13. Space
14. Formations & Structures
15. Player Positions
16. Player Roles
17. Technical Actions
18. Individual Tactics
19. Team Tactics
20. Set Pieces
21. Goalkeeping
22. Physical Performance
23. Psychology
24. Coaching
25. Training
26. Match Analysis
27. Opposition Analysis
28. Scouting
29. Recruitment
30. Player Development
31. Academy & Youth
32. Performance Analysis
33. Football Analytics
34. Data & Tracking
35. Game Intelligence
36. Club / Technical Operations
37. DPF OS Concepts

Future layer
------------
AI / Web Search can later use this vocabulary as the
semantic bridge between user queries and external sources.
==========================================================
*/


/* ======================================================
   NORMALIZATION
====================================================== */

export function normalizeGlossaryTerm(value = "") {
  return value
    .toString()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[’']/g, "")
    .replace(/[-_/]/g, " ")
    .replace(/[^\w\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}


/* ======================================================
   ENTRY FACTORY
====================================================== */

function concept(
  term,
  category,
  definition,
  {
    aliases = [],
    domain = [],
    related = [],
    type = "concept",
  } = {}
) {
  return {
    id: normalizeGlossaryTerm(term)
      .replace(/\s+/g, "-"),

    term,
    type,
    category,
    definition,

    aliases,
    domain,
    related,

    searchableText: normalizeGlossaryTerm(
      [
        term,
        category,
        definition,
        ...aliases,
        ...domain,
        ...related,
      ].join(" ")
    ),
  };
}


/* ======================================================
   MASTER GLOSSARY
====================================================== */

const glossaryEntries = [

  /* ====================================================
     01 — GAME FUNDAMENTALS
  ==================================================== */

  concept(
    "Football",
    "GAME FUNDAMENTALS",
    "A team sport in which two teams compete to score goals while managing space, time, possession and opposition pressure.",
    {
      aliases: ["soccer", "association football"],
      domain: ["game", "sport"],
      related: ["game model", "team", "player"],
    }
  ),

  concept(
    "Game Model",
    "GAME FUNDAMENTALS",
    "The coherent framework describing how a team intends to behave across the different phases and moments of the game.",
    {
      aliases: ["playing model", "team model"],
      domain: ["tactics", "coaching"],
      related: ["playing style", "principles of play", "game phases"],
    }
  ),

  concept(
    "Playing Style",
    "GAME FUNDAMENTALS",
    "The characteristic way a team attempts to play through its structures, behaviours, tempo, risk preferences and tactical choices.",
    {
      aliases: ["style of play", "football style"],
      domain: ["tactics"],
      related: ["game model", "playing system"],
    }
  ),

  concept(
    "Playing System",
    "GAME FUNDAMENTALS",
    "The structural framework connecting formation, player roles, positional relationships and team behaviours.",
    {
      aliases: ["system", "team system"],
      domain: ["tactics"],
      related: ["formation", "roles", "game model"],
    }
  ),

  concept(
    "Principles of Play",
    "GAME FUNDAMENTALS",
    "General tactical rules that guide team and player behaviour during different situations of the game.",
    {
      aliases: ["game principles", "playing principles"],
      domain: ["tactics", "coaching"],
      related: ["tactical principles", "game model"],
    }
  ),

  concept(
    "Game Phase",
    "GAME FUNDAMENTALS",
    "A major state of team behaviour defined by possession, non-possession or transition.",
    {
      aliases: ["phase of play", "game phase"],
      domain: ["tactics"],
      related: ["in possession", "out of possession", "transition"],
    }
  ),


  /* ====================================================
     02 — GAME PHASES
  ==================================================== */

  concept(
    "In Possession",
    "GAME PHASES",
    "The phase in which a team controls the ball and organizes its structure to progress, create and score.",
    {
      aliases: ["attacking phase", "possession phase", "with the ball"],
      domain: ["tactics"],
      related: ["build-up", "progression", "final third"],
    }
  ),

  concept(
    "Out of Possession",
    "GAME PHASES",
    "The phase in which a team does not have the ball and organizes itself to deny progression, protect space and regain possession.",
    {
      aliases: ["defensive phase", "without the ball"],
      domain: ["tactics"],
      related: ["defensive block", "pressing", "defensive transition"],
    }
  ),

  concept(
    "Attacking Transition",
    "GAME PHASES",
    "The moment immediately after winning possession when the team shifts from defensive behaviour toward attacking action.",
    {
      aliases: ["offensive transition", "positive transition"],
      domain: ["transitions"],
      related: ["counter attack", "counter press"],
    }
  ),

  concept(
    "Defensive Transition",
    "GAME PHASES",
    "The moment immediately after losing possession when the team shifts from attacking behaviour toward defensive action.",
    {
      aliases: ["negative transition", "defensive reaction"],
      domain: ["transitions"],
      related: ["counter press", "recovery"],
    }
  ),

  concept(
    "Transition",
    "GAME PHASES",
    "The period in which a team changes its tactical behaviour following a change of possession.",
    {
      aliases: ["moment of transition"],
      domain: ["tactics"],
      related: ["attacking transition", "defensive transition"],
    }
  ),


  /* ====================================================
     03 — TACTICAL PRINCIPLES
  ==================================================== */

  concept(
    "Width",
    "TACTICAL PRINCIPLES",
    "The horizontal occupation of the pitch used to stretch the opposition and create space between defenders.",
    {
      aliases: ["attacking width", "horizontal width"],
      domain: ["possession", "attack"],
      related: ["depth", "spacing", "overload"],
    }
  ),

  concept(
    "Depth",
    "TACTICAL PRINCIPLES",
    "The vertical occupation of space that provides progression options and stretches the opposition from front to back.",
    {
      aliases: ["attacking depth", "vertical depth"],
      domain: ["possession", "attack"],
      related: ["width", "penetration", "stretching"],
    }
  ),

  concept(
    "Mobility",
    "TACTICAL PRINCIPLES",
    "The coordinated movement of players to alter relationships, create space and destabilize defensive structures.",
    {
      aliases: ["movement", "player mobility"],
      domain: ["tactics"],
      related: ["rotation", "interchange", "space"],
    }
  ),

  concept(
    "Compactness",
    "TACTICAL PRINCIPLES",
    "The degree to which a team maintains controlled distances between players and units.",
    {
      aliases: ["team compactness"],
      domain: ["defending"],
      related: ["block", "defensive line", "distances"],
    }
  ),

  concept(
    "Support",
    "TACTICAL PRINCIPLES",
    "A player's positioning or movement that provides the ball carrier with a safe or progressive passing option.",
    {
      aliases: ["supporting position"],
      domain: ["possession"],
      related: ["passing lane", "angles", "third man"],
    }
  ),

  concept(
    "Cover",
    "TACTICAL PRINCIPLES",
    "A defensive relationship in which one player protects space or supports a teammate who is engaging the ball.",
    {
      aliases: ["defensive cover"],
      domain: ["defending"],
      related: ["balance", "support", "pressing"],
    }
  ),

  concept(
    "Balance",
    "TACTICAL PRINCIPLES",
    "The distribution of players that protects the team against immediate threats while maintaining attacking or defensive options.",
    {
      aliases: ["team balance", "rest defence"],
      domain: ["tactics"],
      related: ["rest defence", "cover", "security"],
    }
  ),

  concept(
    "Penetration",
    "TACTICAL PRINCIPLES",
    "The act of advancing the ball or a player beyond an opponent's defensive line or into a dangerous space.",
    {
      aliases: ["breaking lines", "line breaking"],
      domain: ["attack"],
      related: ["progression", "through ball", "runs behind"],
    }
  ),


  /* ====================================================
     04 — POSSESSION
  ==================================================== */

  concept(
    "Possession",
    "POSSESSION",
    "Control of the ball that allows a team to determine the next action and manipulate the opposition.",
    {
      aliases: ["ball possession"],
      domain: ["attack"],
      related: ["circulation", "build-up", "progression"],
    }
  ),

  concept(
    "Ball Circulation",
    "POSSESSION",
    "The movement of the ball between players to manipulate defensive positioning and create progression opportunities.",
    {
      aliases: ["circulation", "ball movement"],
      domain: ["possession"],
      related: ["switch of play", "third man", "width"],
    }
  ),

  concept(
    "Tempo",
    "POSSESSION",
    "The speed and rhythm at which a team moves the ball and changes its attacking actions.",
    {
      aliases: ["playing tempo", "rhythm"],
      domain: ["possession"],
      related: ["speed of play", "circulation"],
    }
  ),

  concept(
    "Speed of Play",
    "POSSESSION",
    "The speed at which players perceive, decide and execute actions.",
    {
      aliases: ["game speed", "execution speed"],
      domain: ["technical", "cognitive"],
      related: ["decision making", "scanning", "tempo"],
    }
  ),

  concept(
    "Third-Man Combination",
    "POSSESSION",
    "A passing sequence in which a third player becomes the final receiver after two other players connect the action.",
    {
      aliases: ["third man", "third player"],
      domain: ["possession"],
      related: ["combination play", "wall pass", "support"],
    }
  ),

  concept(
    "Switch of Play",
    "POSSESSION",
    "A deliberate transfer of the ball from one side of the pitch to another to exploit space created away from the ball.",
    {
      aliases: ["switch", "change of side"],
      domain: ["possession"],
      related: ["width", "circulation", "weak side"],
    }
  ),


  /* ====================================================
     05 — BUILD-UP
  ==================================================== */

  concept(
    "Build-Up",
    "BUILD-UP",
    "The organized process of progressing possession from the defensive area into more advanced zones.",
    {
      aliases: ["build up play", "playing out"],
      domain: ["possession"],
      related: ["goalkeeper build-up", "progression", "press resistance"],
    }
  ),

  concept(
    "Build-Up Structure",
    "BUILD-UP",
    "The positional arrangement used to create passing options and numerical advantages during the first phase of possession.",
    {
      aliases: ["first phase structure"],
      domain: ["possession"],
      related: ["formation", "goalkeeper", "centre backs"],
    }
  ),

  concept(
    "Playing Out",
    "BUILD-UP",
    "The attempt to progress possession from the defensive third through controlled passing rather than immediately playing long.",
    {
      aliases: ["playing out from the back"],
      domain: ["possession"],
      related: ["build-up", "press resistance"],
    }
  ),

  concept(
    "Press Resistance",
    "BUILD-UP",
    "The ability of a player or team to maintain control and progress the ball when subjected to pressure.",
    {
      aliases: ["pressure resistance", "press resistant"],
      domain: ["possession", "technical"],
      related: ["scanning", "first touch", "decision making"],
    }
  ),

  concept(
    "Build-Up Underload",
    "BUILD-UP",
    "A build-up situation in which the team intentionally operates with fewer players in a zone while using positioning or movement to compensate.",
    {
      aliases: ["underload build up"],
      domain: ["tactics"],
      related: ["overload", "rotation"],
    }
  ),


  /* ====================================================
     06 — PROGRESSION
  ==================================================== */

  concept(
    "Progression",
    "PROGRESSION",
    "Advancing the ball toward the opponent's goal through passing, carrying, dribbling or coordinated movement.",
    {
      aliases: ["ball progression", "forward progression"],
      domain: ["attack"],
      related: ["penetration", "progressive pass", "progressive carry"],
    }
  ),

  concept(
    "Progressive Pass",
    "PROGRESSION",
    "A pass that significantly advances the ball toward the opponent's goal according to the definition used by the relevant data provider.",
    {
      aliases: ["progressive passing"],
      domain: ["analytics", "passing"],
      related: ["line breaking", "progression"],
    }
  ),

  concept(
    "Progressive Carry",
    "PROGRESSION",
    "A controlled movement of the ball by a player that significantly advances possession toward the opponent's goal.",
    {
      aliases: ["progressive dribble", "ball carry"],
      domain: ["analytics", "dribbling"],
      related: ["progression", "dribbling"],
    }
  ),

  concept(
    "Line-Breaking Pass",
    "PROGRESSION",
    "A pass that eliminates one or more defensive lines or players and creates a more advanced attacking situation.",
    {
      aliases: ["line breaker", "breaking the line"],
      domain: ["passing"],
      related: ["penetration", "progression"],
    }
  ),


  /* ====================================================
     07 — FINAL THIRD
  ==================================================== */

  concept(
    "Final Third",
    "FINAL THIRD",
    "The attacking area closest to the opponent's goal.",
    {
      aliases: ["attacking third"],
      domain: ["attack"],
      related: ["final-third entry", "chance creation"],
    }
  ),

  concept(
    "Chance Creation",
    "FINAL THIRD",
    "The process of generating opportunities from which a shot or goal-scoring action can occur.",
    {
      aliases: ["chance creation"],
      domain: ["attack", "analytics"],
      related: ["xG", "key pass", "shot creation"],
    }
  ),

  concept(
    "Cutback",
    "FINAL THIRD",
    "A pass played backward from a wide or advanced position toward a central attacking area.",
    {
      aliases: ["cut back"],
      domain: ["attack"],
      related: ["cross", "box entry"],
    }
  ),

  concept(
    "Cross",
    "FINAL THIRD",
    "A ball delivered from a wide area toward teammates in or around the penalty area.",
    {
      aliases: ["crossing", "delivery"],
      domain: ["attack"],
      related: ["cutback", "chance creation"],
    }
  ),

  concept(
    "Half-Space",
    "FINAL THIRD",
    "The vertical corridor between the central zone and the wide zone of the pitch.",
    {
      aliases: ["halfspace", "inside channel"],
      domain: ["positional play"],
      related: ["width", "central space", "positional play"],
    }
  ),

  concept(
    "Box Occupation",
    "FINAL THIRD",
    "The positioning and movement of attacking players within and around the penalty area.",
    {
      aliases: ["penalty box occupation"],
      domain: ["attack"],
      related: ["cross", "cutback", "finishing"],
    }
  ),


  /* ====================================================
     08 — DEFENSIVE ORGANISATION
  ==================================================== */

  concept(
    "Defensive Block",
    "DEFENSIVE ORGANISATION",
    "The collective structure a team uses while defending without immediately pressing the ball.",
    {
      aliases: ["defensive shape", "block"],
      domain: ["defending"],
      related: ["low block", "mid block", "compactness"],
    }
  ),

  concept(
    "Low Block",
    "DEFENSIVE ORGANISATION",
    "A defensive structure positioned relatively close to its own goal.",
    {
      aliases: ["deep block"],
      domain: ["defending"],
      related: ["compactness", "defensive line"],
    }
  ),

  concept(
    "Mid Block",
    "DEFENSIVE ORGANISATION",
    "A defensive structure positioned in a middle area of the pitch, allowing the opposition possession in less dangerous zones.",
    {
      aliases: ["medium block"],
      domain: ["defending"],
      related: ["pressing", "compactness"],
    }
  ),

  concept(
    "High Block",
    "DEFENSIVE ORGANISATION",
    "A defensive structure positioned high up the pitch with the intention of restricting opposition build-up.",
    {
      aliases: ["high defensive block"],
      domain: ["defending"],
      related: ["high press", "defensive line"],
    }
  ),

  concept(
    "Defensive Compactness",
    "DEFENSIVE ORGANISATION",
    "The maintenance of controlled vertical and horizontal distances between defenders.",
    {
      aliases: ["compact defending"],
      domain: ["defending"],
      related: ["block", "distances", "cover"],
    }
  ),

  concept(
    "Defensive Line",
    "DEFENSIVE ORGANISATION",
    "The positioning and coordination of the defensive unit relative to the ball, opponents and goal.",
    {
      aliases: ["back line", "last line"],
      domain: ["defending"],
      related: ["offside", "high line", "depth"],
    }
  ),

  concept(
    "High Line",
    "DEFENSIVE ORGANISATION",
    "A defensive line positioned relatively high up the pitch to reduce available space and potentially use the offside line.",
    {
      aliases: ["high defensive line"],
      domain: ["defending"],
      related: ["offside trap", "pressing"],
    }
  ),


  /* ====================================================
     09 — PRESSING
  ==================================================== */

  concept(
    "Pressing",
    "PRESSING",
    "Coordinated defensive pressure designed to restrict the opponent's options and regain possession.",
    {
      aliases: ["press", "defensive pressure"],
      domain: ["defending"],
      related: ["press trigger", "high press", "counter press"],
    }
  ),

  concept(
    "High Press",
    "PRESSING",
    "Pressing initiated high up the pitch with the aim of disrupting opposition build-up.",
    {
      aliases: ["high pressing"],
      domain: ["defending"],
      related: ["pressing", "press trigger"],
    }
  ),

  concept(
    "Mid Press",
    "PRESSING",
    "Pressing initiated from a middle area of the pitch rather than immediately engaging the opponent deep in their half.",
    {
      aliases: ["midfield press"],
      domain: ["defending"],
      related: ["mid block", "press trigger"],
    }
  ),

  concept(
    "Press Trigger",
    "PRESSING",
    "A specific event that signals players to begin or intensify coordinated pressure.",
    {
      aliases: ["pressing trigger", "trigger"],
      domain: ["defending"],
      related: ["pressing", "trap"],
    }
  ),

  concept(
    "Pressing Trap",
    "PRESSING",
    "A coordinated defensive strategy that intentionally directs the opponent toward a predictable area before applying pressure.",
    {
      aliases: ["press trap", "pressing trap"],
      domain: ["defending"],
      related: ["press trigger", "cover shadow"],
    }
  ),

  concept(
    "Counter-Press",
    "PRESSING",
    "Immediate pressure applied after losing possession in an attempt to regain the ball before the opponent can reorganize.",
    {
      aliases: ["counterpress", "gegenpressing"],
      domain: ["transitions", "defending"],
      related: ["defensive transition", "pressing"],
    }
  ),

  concept(
    "Cover Shadow",
    "PRESSING",
    "The area behind a pressing player that becomes inaccessible to the opponent because of the player's body position.",
    {
      aliases: ["cover shadow"],
      domain: ["pressing"],
      related: ["pressing", "screening"],
    }
  ),

  concept(
    "PPDA",
    "PRESSING",
    "Passes allowed per defensive action, commonly used as an indicator of pressing intensity.",
    {
      aliases: ["passes per defensive action"],
      domain: ["analytics", "pressing"],
      related: ["pressing", "defensive actions"],
    }
  ),


  /* ====================================================
     10 — TRANSITIONS
  ==================================================== */

  concept(
    "Counter-Attack",
    "TRANSITIONS",
    "A rapid attacking action following a regain of possession while the opponent is not yet organized.",
    {
      aliases: ["counter attack", "fast break"],
      domain: ["transitions"],
      related: ["attacking transition", "verticality"],
    }
  ),

  concept(
    "Recovery Run",
    "TRANSITIONS",
    "A player's movement back toward a defensive position after possession is lost.",
    {
      aliases: ["defensive recovery"],
      domain: ["transitions"],
      related: ["defensive transition", "recovery shape"],
    }
  ),

  concept(
    "Rest Defence",
    "TRANSITIONS",
    "The structure maintained behind the ball during possession to protect against counter-attacks after possession is lost.",
    {
      aliases: ["rest defense", "security structure"],
      domain: ["transitions", "possession"],
      related: ["balance", "counter attack", "defensive transition"],
    }
  ),

  concept(
    "Transition Moment",
    "TRANSITIONS",
    "The short tactical window immediately following a change of possession when both teams are reorganizing.",
    {
      aliases: ["transition phase"],
      domain: ["transitions"],
      related: ["counter attack", "counter press"],
    }
  ),


  /* ====================================================
     11 — POSITIONAL PLAY & SPACE
  ==================================================== */

  concept(
    "Positional Play",
    "POSITIONAL PLAY",
    "A tactical approach that uses deliberate occupation of zones and relationships to create passing options and numerical advantages.",
    {
      aliases: ["juego de posicion", "positional football"],
      domain: ["tactics"],
      related: ["zones", "width", "half-space"],
    }
  ),

  concept(
    "Functional Space",
    "POSITIONAL PLAY",
    "Space whose tactical value is determined by the relationships, positioning and movement of players within the game context.",
    {
      aliases: ["functional space"],
      domain: ["DPF", "positional play"],
      related: ["space", "relationships", "dynamic occupation"],
      type: "dpf",
    }
  ),

  concept(
    "Dynamic Occupation",
    "POSITIONAL PLAY",
    "The continuous adjustment of player positions in response to ball location, teammates, opponents and tactical objectives.",
    {
      aliases: ["dynamic positioning", "dynamic occupation of space"],
      domain: ["DPF", "positional play"],
      related: ["functional space", "mobility", "rotation"],
      type: "dpf",
    }
  ),

  concept(
    "Space",
    "POSITIONAL PLAY",
    "The physical area available for players or the ball and the relationships that determine its tactical value.",
    {
      aliases: ["available space", "free space"],
      domain: ["tactics"],
      related: ["functional space", "space creation"],
    }
  ),

  concept(
    "Space Creation",
    "POSITIONAL PLAY",
    "The intentional creation of usable space through positioning, movement, occupation or manipulation of opponents.",
    {
      aliases: ["creating space"],
      domain: ["attack"],
      related: ["mobility", "rotation", "overload"],
    }
  ),

  concept(
    "Overload",
    "POSITIONAL PLAY",
    "A deliberate concentration of players in a zone to create a numerical advantage.",
    {
      aliases: ["numerical overload", "3v2", "4v3"],
      domain: ["tactics"],
      related: ["underload", "isolation", "combination"],
    }
  ),

  concept(
    "Isolation",
    "POSITIONAL PLAY",
    "A tactical situation designed to leave a player in a favorable one-versus-one situation.",
    {
      aliases: ["1v1 isolation"],
      domain: ["attack"],
      related: ["overload", "winger", "dribbling"],
    }
  ),

  concept(
    "Rotation",
    "POSITIONAL PLAY",
    "A coordinated exchange of positions between players that preserves or improves team functionality.",
    {
      aliases: ["positional rotation"],
      domain: ["tactics"],
      related: ["mobility", "interchange"],
    }
  ),

  concept(
    "Interchange",
    "POSITIONAL PLAY",
    "Players temporarily exchange positional responsibilities or zones during play.",
    {
      aliases: ["positional interchange"],
      domain: ["tactics"],
      related: ["rotation", "mobility"],
    }
  ),

  concept(
    "Between the Lines",
    "POSITIONAL PLAY",
    "Space located between opposition defensive or midfield lines where a player can receive facing forward.",
    {
      aliases: ["between lines", "interline space"],
      domain: ["attack"],
      related: ["half-space", "receiving"],
    }
  ),


  /* ====================================================
     12 — FORMATIONS & STRUCTURES
  ==================================================== */

  concept(
    "Formation",
    "FORMATIONS",
    "The nominal structural arrangement used to describe the distribution of players on the pitch.",
    {
      aliases: ["shape", "starting formation"],
      domain: ["tactics"],
      related: ["4-3-3", "4-2-3-1", "3-4-3"],
    },
    { type: "formation" }
  ),

  concept(
    "4-3-3",
    "FORMATIONS",
    "A structure consisting nominally of four defenders, three midfielders and three attackers.",
    {
      aliases: ["433", "4 3 3"],
      domain: ["formation"],
      related: ["4-2-3-1", "4-4-2"],
      type: "formation",
    }
  ),

  concept(
    "4-2-3-1",
    "FORMATIONS",
    "A structure consisting nominally of four defenders, two deeper midfielders, three attacking midfielders and one striker.",
    {
      aliases: ["4231", "4 2 3 1"],
      domain: ["formation"],
      related: ["4-3-3", "4-4-2"],
      type: "formation",
    }
  ),

  concept(
    "4-4-2",
    "FORMATIONS",
    "A structure consisting nominally of four defenders, four midfielders and two forwards.",
    {
      aliases: ["442", "4 4 2"],
      domain: ["formation"],
      related: ["4-2-3-1"],
      type: "formation",
    }
  ),

  concept(
    "3-4-3",
    "FORMATIONS",
    "A structure consisting nominally of three defenders, four midfielders and three attackers.",
    {
      aliases: ["343", "3 4 3"],
      domain: ["formation"],
      related: ["3-5-2", "5-2-3"],
      type: "formation",
    }
  ),

  concept(
    "3-5-2",
    "FORMATIONS",
    "A structure consisting nominally of three defenders, five midfielders and two forwards.",
    {
      aliases: ["352", "3 5 2"],
      domain: ["formation"],
      related: ["3-4-3", "5-3-2"],
      type: "formation",
    }
  ),

  concept(
    "Back Three",
    "FORMATIONS",
    "A defensive structure using three central defenders.",
    {
      aliases: ["three centre backs", "back three"],
      domain: ["formation"],
      related: ["3-4-3", "3-5-2"],
    }
  ),


  /* ====================================================
     13 — POSITIONS
  ==================================================== */

  concept(
    "Goalkeeper",
    "POSITIONS",
    "The player responsible for defending the goal and acting as the team's final defensive line.",
    {
      aliases: ["GK", "keeper", "goalie"],
      domain: ["position"],
      related: ["sweeper keeper", "goalkeeping"],
      type: "position",
    }
  ),

  concept(
    "Centre-Back",
    "POSITIONS",
    "A central defender responsible for protecting central areas, defending space and supporting build-up.",
    {
      aliases: ["CB", "central defender", "centre back"],
      domain: ["position"],
      related: ["defender", "ball playing defender"],
      type: "position",
    }
  ),

  concept(
    "Full-Back",
    "POSITIONS",
    "A wide defender operating primarily on either the right or left side.",
    {
      aliases: ["fullback", "FB"],
      domain: ["position"],
      related: ["inverted fullback", "wingback"],
      type: "position",
    }
  ),

  concept(
    "Wing-Back",
    "POSITIONS",
    "A wide player operating in systems where their responsibilities combine elements of full-back and winger roles.",
    {
      aliases: ["wingback", "WB"],
      domain: ["position"],
      related: ["fullback", "wide player"],
      type: "position",
    }
  ),

  concept(
    "Defensive Midfielder",
    "POSITIONS",
    "A central midfielder whose responsibilities commonly include protecting the defence, supporting build-up and controlling central space.",
    {
      aliases: ["DM", "CDM", "holding midfielder"],
      domain: ["position"],
      related: ["pivot", "number 6"],
      type: "position",
    }
  ),

  concept(
    "Central Midfielder",
    "POSITIONS",
    "A midfielder operating primarily in central areas with responsibilities that vary according to the tactical model.",
    {
      aliases: ["CM", "number 8"],
      domain: ["position"],
      related: ["box to box", "playmaker"],
      type: "position",
    }
  ),

  concept(
    "Attacking Midfielder",
    "POSITIONS",
    "An advanced midfielder operating between or behind opposition midfield and defensive lines.",
    {
      aliases: ["AM", "CAM", "number 10"],
      domain: ["position"],
      related: ["between lines", "playmaker"],
      type: "position",
    }
  ),

  concept(
    "Winger",
    "POSITIONS",
    "A wide attacking player whose role may include width, progression, crossing, dribbling and inside movement.",
    {
      aliases: ["wide forward", "wide attacker"],
      domain: ["position"],
      related: ["inside forward", "wide player"],
      type: "position",
    }
  ),

  concept(
    "Centre-Forward",
    "POSITIONS",
    "An attacking player operating centrally with responsibilities that may include finishing, linking play, pressing and occupying defenders.",
    {
      aliases: ["CF", "striker", "number 9"],
      domain: ["position"],
      related: ["false nine", "target man"],
      type: "position",
    }
  ),


  /* ====================================================
     14 — PLAYER ROLES
  ==================================================== */

  concept(
    "Inverted Full-Back",
    "PLAYER ROLES",
    "A full-back who moves into central areas during possession to support midfield structure and progression.",
    {
      aliases: ["inverted fullback", "inverting fullback"],
      domain: ["role", "positional play"],
      related: ["fullback", "midfield overload"],
      type: "role",
    }
  ),

  concept(
    "Ball-Playing Defender",
    "PLAYER ROLES",
    "A defender whose role emphasizes controlled possession, progressive passing and build-up contribution.",
    {
      aliases: ["ball playing centre back", "progressive defender"],
      domain: ["role"],
      related: ["centre back", "build-up"],
      type: "role",
    }
  ),

  concept(
    "Deep-Lying Playmaker",
    "PLAYER ROLES",
    "A deeper midfielder who influences possession through distribution, tempo control and progression.",
    {
      aliases: ["DLP", "deep playmaker"],
      domain: ["role"],
      related: ["pivot", "playmaker"],
      type: "role",
    }
  ),

  concept(
    "Box-to-Box Midfielder",
    "PLAYER ROLES",
    "A midfielder who contributes across both defensive and attacking zones with significant movement between areas.",
    {
      aliases: ["box to box", "B2B"],
      domain: ["role"],
      related: ["central midfielder", "late runs"],
      type: "role",
    }
  ),

  concept(
    "Advanced Playmaker",
    "PLAYER ROLES",
    "An advanced creative player responsible for creating advantages through receiving, passing, combination and chance creation.",
    {
      aliases: ["creative midfielder", "number 10"],
      domain: ["role"],
      related: ["attacking midfielder", "chance creation"],
      type: "role",
    }
  ),

  concept(
    "Inside Forward",
    "PLAYER ROLES",
    "A wide attacker who frequently moves inside toward goal or central attacking areas.",
    {
      aliases: ["inside forward", "inverted winger"],
      domain: ["role"],
      related: ["winger", "half-space"],
      type: "role",
    }
  ),

  concept(
    "False Nine",
    "PLAYER ROLES",
    "A nominal centre-forward who frequently drops into deeper areas rather than constantly occupying the highest line.",
    {
      aliases: ["false 9", "false-nine"],
      domain: ["role"],
      related: ["centre forward", "between lines"],
      type: "role",
    }
  ),

  concept(
    "Target Forward",
    "PLAYER ROLES",
    "A forward used as a reference point for direct play, aerial contests, hold-up play and attacking progression.",
    {
      aliases: ["target man", "target striker"],
      domain: ["role"],
      related: ["centre forward", "hold-up play"],
      type: "role",
    }
  ),


  /* ====================================================
     15 — TECHNICAL ACTIONS
  ==================================================== */

  concept(
    "First Touch",
    "TECHNICAL",
    "The player's initial control of the ball after receiving it.",
    {
      aliases: ["first contact", "ball control"],
      domain: ["technical"],
      related: ["receiving", "press resistance"],
    }
  ),

  concept(
    "Scanning",
    "TECHNICAL",
    "The process of gathering visual information before and during an action to understand available options.",
    {
      aliases: ["visual scanning", "head checks"],
      domain: ["cognitive", "technical"],
      related: ["awareness", "decision making"],
    }
  ),

  concept(
    "Passing",
    "TECHNICAL",
    "The action of intentionally transferring the ball to a teammate.",
    {
      aliases: ["pass"],
      domain: ["technical"],
      related: ["progressive pass", "combination play"],
    }
  ),

  concept(
    "Dribbling",
    "TECHNICAL",
    "The act of carrying or manipulating the ball while moving past or around opponents.",
    {
      aliases: ["dribble", "1v1"],
      domain: ["technical"],
      related: ["isolation", "ball carrying"],
    }
  ),

  concept(
    "Finishing",
    "TECHNICAL",
    "The execution of an attacking action intended to score a goal.",
    {
      aliases: ["shooting", "finishing ability"],
      domain: ["technical"],
      related: ["xG", "shot quality"],
    }
  ),

  concept(
    "Receiving",
    "TECHNICAL",
    "The action of controlling the ball when it arrives from a teammate.",
    {
      aliases: ["receiving the ball"],
      domain: ["technical"],
      related: ["first touch", "half-turn"],
    }
  ),

  concept(
    "Half-Turn",
    "TECHNICAL",
    "A receiving position in which the player is oriented partially toward the next direction of play.",
    {
      aliases: ["open body", "side-on receiving"],
      domain: ["technical"],
      related: ["receiving", "scanning"],
    }
  ),


  /* ====================================================
     16 — INDIVIDUAL TACTICS
  ==================================================== */

  concept(
    "Decision Making",
    "INDIVIDUAL TACTICS",
    "The player's ability to select an appropriate action from the available options in a given game context.",
    {
      aliases: ["decision-making", "choice"],
      domain: ["cognitive"],
      related: ["perception", "scanning", "game intelligence"],
    }
  ),

  concept(
    "Game Intelligence",
    "INDIVIDUAL TACTICS",
    "The ability to perceive game information, understand relationships and select actions that serve tactical objectives.",
    {
      aliases: ["football intelligence", "tactical intelligence"],
      domain: ["cognitive"],
      related: ["decision making", "awareness"],
    }
  ),

  concept(
    "Body Orientation",
    "INDIVIDUAL TACTICS",
    "The player's body position relative to the ball, opponents, teammates and intended next action.",
    {
      aliases: ["body shape", "body position"],
      domain: ["technical", "tactical"],
      related: ["receiving", "scanning"],
    }
  ),

  concept(
    "Off-Ball Movement",
    "INDIVIDUAL TACTICS",
    "Movement performed without possession to create space, support teammates or threaten defensive structures.",
    {
      aliases: ["movement off the ball"],
      domain: ["tactics"],
      related: ["runs", "space creation"],
    }
  ),

  concept(
    "Supporting Run",
    "INDIVIDUAL TACTICS",
    "A movement designed to provide an additional option for the player in possession.",
    {
      aliases: ["supporting movement"],
      domain: ["attack"],
      related: ["support", "combination"],
    }
  ),

  concept(
    "Run in Behind",
    "INDIVIDUAL TACTICS",
    "A forward movement designed to attack space behind an opposition defensive line.",
    {
      aliases: ["run behind", "depth run"],
      domain: ["attack"],
      related: ["penetration", "depth"],
    }
  ),


  /* ====================================================
     17 — SET PIECES
  ==================================================== */

  concept(
    "Set Piece",
    "SET PIECES",
    "A planned restart situation such as a corner, free kick, throw-in or penalty.",
    {
      aliases: ["dead ball"],
      domain: ["set pieces"],
      related: ["corner", "free kick"],
    }
  ),

  concept(
    "Corner Kick",
    "SET PIECES",
    "A restart from the corner area following the ball going out of play over the defending team's goal line.",
    {
      aliases: ["corner", "corner"],
      domain: ["set pieces"],
      related: ["near post", "far post"],
    }
  ),

  concept(
    "Free Kick",
    "SET PIECES",
    "A restart awarded following a foul or other infringement according to the Laws of the Game.",
    {
      aliases: ["free-kick"],
      domain: ["set pieces", "rules"],
      related: ["direct free kick", "indirect free kick"],
    }
  ),

  concept(
    "Penalty",
    "SET PIECES",
    "A direct free kick taken from the penalty mark following an offence punishable by a penalty kick.",
    {
      aliases: ["penalty kick", "spot kick"],
      domain: ["set pieces", "rules"],
      related: ["finishing", "goalkeeper"],
    }
  ),

  concept(
    "Near-Post",
    "SET PIECES",
    "The area of the goal or attacking zone closest to the side from which a delivery originates.",
    {
      aliases: ["near post"],
      domain: ["set pieces"],
      related: ["far post", "corner"],
    }
  ),

  concept(
    "Far-Post",
    "SET PIECES",
    "The area of the goal or attacking zone furthest from the side from which a delivery originates.",
    {
      aliases: ["far post"],
      domain: ["set pieces"],
      related: ["near post", "corner"],
    }
  ),


  /* ====================================================
     18 — GOALKEEPING
  ==================================================== */

  concept(
    "Sweeper-Keeper",
    "GOALKEEPING",
    "A goalkeeper who actively defends space behind the defensive line and contributes to possession.",
    {
      aliases: ["sweeper keeper", "SK"],
      domain: ["goalkeeping"],
      related: ["goalkeeper", "high line"],
      type: "role",
    }
  ),

  concept(
    "Goalkeeper Distribution",
    "GOALKEEPING",
    "The goalkeeper's ability to restart and progress possession using feet, hands or longer distribution.",
    {
      aliases: ["GK distribution"],
      domain: ["goalkeeping"],
      related: ["build-up", "playing out"],
    }
  ),

  concept(
    "Shot Stopping",
    "GOALKEEPING",
    "The goalkeeper's ability to prevent shots from becoming goals.",
    {
      aliases: ["shot stopping"],
      domain: ["goalkeeping"],
      related: ["goalkeeper", "xGOT"],
    }
  ),

  concept(
    "Cross Claiming",
    "GOALKEEPING",
    "The goalkeeper's ability to safely intercept or catch aerial deliveries into the penalty area.",
    {
      aliases: ["claiming crosses"],
      domain: ["goalkeeping"],
      related: ["cross", "aerial ability"],
    }
  ),


  /* ====================================================
     19 — PHYSICAL PERFORMANCE
  ==================================================== */

  concept(
    "Acceleration",
    "PHYSICAL",
    "The ability to increase running speed rapidly.",
    {
      aliases: ["accelerative ability"],
      domain: ["physical"],
      related: ["sprinting", "explosiveness"],
    }
  ),

  concept(
    "Maximum Speed",
    "PHYSICAL",
    "The highest running velocity achieved by a player during a period.",
    {
      aliases: ["top speed", "max speed"],
      domain: ["physical", "GPS"],
      related: ["sprint", "high speed running"],
    }
  ),

  concept(
    "High-Speed Running",
    "PHYSICAL",
    "Running performed above a defined speed threshold used by a tracking or performance system.",
    {
      aliases: ["HSR", "high speed running"],
      domain: ["physical", "GPS"],
      related: ["sprint", "GPS tracking"],
    }
  ),

  concept(
    "Sprint",
    "PHYSICAL",
    "A high-intensity running action performed at a very high velocity.",
    {
      aliases: ["sprinting"],
      domain: ["physical"],
      related: ["maximum speed", "acceleration"],
    }
  ),

  concept(
    "Load",
    "PHYSICAL",
    "The physical and physiological demands imposed on a player during training or competition.",
    {
      aliases: ["training load", "workload"],
      domain: ["performance"],
      related: ["GPS", "monitoring", "recovery"],
    }
  ),

  concept(
    "Recovery",
    "PHYSICAL",
    "The process through which the player restores physical and physiological readiness after activity.",
    {
      aliases: ["recovery process"],
      domain: ["performance"],
      related: ["load", "fatigue"],
    }
  ),

  concept(
    "Fatigue",
    "PHYSICAL",
    "A reduction in physical or cognitive capacity associated with accumulated demands.",
    {
      aliases: ["fatigue state"],
      domain: ["performance"],
      related: ["load", "recovery"],
    }
  ),


  /* ====================================================
     20 — PSYCHOLOGY
  ==================================================== */

  concept(
    "Concentration",
    "PSYCHOLOGY",
    "The ability to maintain attention on relevant information and tasks during performance.",
    {
      aliases: ["focus", "attention"],
      domain: ["psychology"],
      related: ["awareness", "decision making"],
    }
  ),

  concept(
    "Composure",
    "PSYCHOLOGY",
    "The ability to remain controlled and effective under pressure.",
    {
      aliases: ["calmness"],
      domain: ["psychology"],
      related: ["decision making", "pressure"],
    }
  ),

  concept(
    "Confidence",
    "PSYCHOLOGY",
    "The player's belief in their ability to execute actions effectively.",
    {
      aliases: ["self confidence"],
      domain: ["psychology"],
      related: ["composure", "performance"],
    }
  ),

  concept(
    "Resilience",
    "PSYCHOLOGY",
    "The ability to recover psychologically from setbacks and continue performing effectively.",
    {
      aliases: ["mental resilience"],
      domain: ["psychology"],
      related: ["confidence", "adaptability"],
    }
  ),


  /* ====================================================
     21 — COACHING
  ==================================================== */

  concept(
    "Coaching",
    "COACHING",
    "The process of guiding players and teams toward improved performance, understanding and behaviour.",
    {
      aliases: ["football coaching"],
      domain: ["coaching"],
      related: ["training", "feedback", "development"],
    }
  ),

  concept(
    "Session",
    "COACHING",
    "A structured training period containing practices designed around specific learning or performance objectives.",
    {
      aliases: ["training session"],
      domain: ["coaching"],
      related: ["practice", "session plan"],
    }
  ),

  concept(
    "Practice",
    "COACHING",
    "A designed training activity used to develop a particular technical, tactical, physical or cognitive objective.",
    {
      aliases: ["drill", "exercise"],
      domain: ["coaching"],
      related: ["session", "training"],
    }
  ),

  concept(
    "Coaching Point",
    "COACHING",
    "A specific piece of information or feedback used to influence player behaviour or understanding.",
    {
      aliases: ["coaching cue", "cue"],
      domain: ["coaching"],
      related: ["feedback", "learning"],
    }
  ),

  concept(
    "Feedback",
    "COACHING",
    "Information provided to a player or team about performance to support learning and improvement.",
    {
      aliases: ["performance feedback"],
      domain: ["coaching"],
      related: ["coaching point", "learning"],
    }
  ),

  concept(
    "Constraints",
    "COACHING",
    "Rules or conditions deliberately added to a practice to shape player behaviour and learning.",
    {
      aliases: ["constraints-led"],
      domain: ["coaching", "methodology"],
      related: ["practice", "learning"],
    }
  ),


  /* ====================================================
     22 — TRAINING
  ==================================================== */

  concept(
    "Training Methodology",
    "TRAINING",
    "The principles and methods used to organize learning and physical preparation within football training.",
    {
      aliases: ["training methodology"],
      domain: ["methodology"],
      related: ["session", "practice", "periodization"],
    }
  ),

  concept(
    "Periodization",
    "TRAINING",
    "The structured organization of training loads and objectives across time.",
    {
      aliases: ["training periodization"],
      domain: ["methodology", "performance"],
      related: ["microcycle", "load"],
    }
  ),

  concept(
    "Microcycle",
    "TRAINING",
    "A short training cycle, commonly organized around a competitive match or specific weekly structure.",
    {
      aliases: ["weekly cycle"],
      domain: ["training"],
      related: ["periodization", "match day"],
    }
  ),

  concept(
    "Small-Sided Game",
    "TRAINING",
    "A reduced-player practice designed to reproduce selected game behaviours under controlled conditions.",
    {
      aliases: ["SSG", "small sided game"],
      domain: ["training"],
      related: ["practice", "constraints"],
    }
  ),

  concept(
    "Game-Based Training",
    "TRAINING",
    "Training that uses representative game situations to develop football behaviour rather than isolated technique alone.",
    {
      aliases: ["game based practice"],
      domain: ["methodology"],
      related: ["small sided game", "decision making"],
    }
  ),


  /* ====================================================
     23 — MATCH ANALYSIS
  ==================================================== */

  concept(
    "Performance Analysis",
    "MATCH ANALYSIS",
    "The systematic study of team or player performance using video, data and contextual information.",
    {
      aliases: ["match analysis"],
      domain: ["analysis"],
      related: ["video analysis", "data analysis"],
    }
  ),

  concept(
    "Video Analysis",
    "MATCH ANALYSIS",
    "The structured review of match or training footage to identify behaviours, patterns and performance insights.",
    {
      aliases: ["video review"],
      domain: ["analysis"],
      related: ["performance analysis", "opposition analysis"],
    }
  ),

  concept(
    "Opposition Analysis",
    "MATCH ANALYSIS",
    "The study of an opponent's structures, behaviours, strengths, weaknesses and tendencies.",
    {
      aliases: ["opponent analysis", "opposition scouting"],
      domain: ["analysis"],
      related: ["scouting", "match preparation"],
    }
  ),

  concept(
    "Match Preparation",
    "MATCH ANALYSIS",
    "The process of preparing players and staff for the tactical, physical and contextual demands of an upcoming match.",
    {
      aliases: ["game preparation"],
      domain: ["coaching"],
      related: ["opposition analysis", "game plan"],
    }
  ),

  concept(
    "Game Plan",
    "MATCH ANALYSIS",
    "The match-specific tactical plan that translates the team's principles into actions against a particular opponent.",
    {
      aliases: ["match plan", "game strategy"],
      domain: ["tactics"],
      related: ["opposition analysis", "game model"],
    }
  ),


  /* ====================================================
     24 — SCOUTING
  ==================================================== */

  concept(
    "Scouting",
    "SCOUTING",
    "The systematic identification and evaluation of players, teams or opponents using observation, video, data and contextual information.",
    {
      aliases: ["football scouting"],
      domain: ["recruitment"],
      related: ["talent identification", "player profile"],
    }
  ),

  concept(
    "Talent Identification",
    "SCOUTING",
    "The process of identifying players with the potential to perform or develop at a higher level.",
    {
      aliases: ["Talent ID", "talent identification"],
      domain: ["scouting", "development"],
      related: ["player potential", "recruitment"],
    }
  ),

  concept(
    "Player Profile",
    "SCOUTING",
    "A structured description of a player's characteristics, behaviours, performance indicators and potential fit.",
    {
      aliases: ["scouting profile"],
      domain: ["scouting"],
      related: ["player evaluation", "recruitment"],
    }
  ),

  concept(
    "Player Evaluation",
    "SCOUTING",
    "The systematic assessment of a player's current performance, characteristics and potential.",
    {
      aliases: ["player assessment"],
      domain: ["scouting"],
      related: ["player profile", "talent identification"],
    }
  ),

  concept(
    "Tactical Fit",
    "SCOUTING",
    "The degree to which a player's characteristics and behaviours align with a team's tactical requirements.",
    {
      aliases: ["system fit", "role fit"],
      domain: ["scouting", "recruitment"],
      related: ["player profile", "game model"],
    }
  ),

  concept(
    "Recruitment",
    "SCOUTING",
    "The structured process of identifying, evaluating, selecting and acquiring players for a team.",
    {
      aliases: ["player recruitment", "transfer recruitment"],
      domain: ["scouting", "club operations"],
      related: ["shortlist", "player profile"],
    }
  ),

  concept(
    "Shortlist",
    "SCOUTING",
    "A focused group of players retained for deeper evaluation or recruitment consideration.",
    {
      aliases: ["recruitment shortlist"],
      domain: ["scouting"],
      related: ["recruitment", "player profile"],
    }
  ),


  /* ====================================================
     25 — PLAYER DEVELOPMENT
  ==================================================== */

  concept(
    "Player Development",
    "PLAYER DEVELOPMENT",
    "The structured process of improving a player's football capabilities over time.",
    {
      aliases: ["individual development"],
      domain: ["development"],
      related: ["player pathway", "development plan"],
    }
  ),

  concept(
    "Individual Development Plan",
    "PLAYER DEVELOPMENT",
    "A structured plan defining a player's development priorities, objectives, interventions and review process.",
    {
      aliases: ["IDP", "individual development plan"],
      domain: ["development"],
      related: ["player development", "objectives"],
    }
  ),

  concept(
    "Player Pathway",
    "PLAYER DEVELOPMENT",
    "The sequence of developmental environments and stages through which a player progresses.",
    {
      aliases: ["development pathway"],
      domain: ["development"],
      related: ["academy", "player development"],
    }
  ),

  concept(
    "Development Objective",
    "PLAYER DEVELOPMENT",
    "A defined capability or behaviour that a player is expected to improve.",
    {
      aliases: ["development goal"],
      domain: ["development"],
      related: ["IDP", "feedback"],
    }
  ),

  concept(
    "Potential",
    "PLAYER DEVELOPMENT",
    "The projected capacity of a player to develop future performance capabilities.",
    {
      aliases: ["player potential", "development potential"],
      domain: ["development", "scouting"],
      related: ["talent identification", "projection"],
    }
  ),


  /* ====================================================
     26 — ACADEMY & YOUTH
  ==================================================== */

  concept(
    "Academy",
    "ACADEMY & YOUTH",
    "An organized football development environment designed to develop players across multiple age groups.",
    {
      aliases: ["football academy", "youth academy"],
      domain: ["development"],
      related: ["youth development", "player pathway"],
    }
  ),

  concept(
    "Youth Development",
    "ACADEMY & YOUTH",
    "The long-term development of young players across technical, tactical, physical, cognitive and personal dimensions.",
    {
      aliases: ["youth player development"],
      domain: ["development"],
      related: ["academy", "player pathway"],
    }
  ),

  concept(
    "Age-Group Development",
    "ACADEMY & YOUTH",
    "The organization of player development according to age-related needs and developmental stages.",
    {
      aliases: ["age group"],
      domain: ["academy"],
      related: ["youth development", "player pathway"],
    }
  ),

  concept(
    "Long-Term Player Development",
    "ACADEMY & YOUTH",
    "A development approach focused on progressive improvement over multiple years rather than short-term results.",
    {
      aliases: ["long term development", "LTPD"],
      domain: ["development"],
      related: ["academy", "player pathway"],
    }
  ),


  /* ====================================================
     27 — FOOTBALL ANALYTICS
  ==================================================== */

  concept(
    "Expected Goals",
    "ANALYTICS",
    "A statistical estimate of the probability that a shot will result in a goal.",
    {
      aliases: ["xG", "expected goal"],
      domain: ["analytics", "shooting"],
      related: ["xGOT", "finishing"],
      type: "metric",
    }
  ),

  concept(
    "Expected Assists",
    "ANALYTICS",
    "A metric estimating the likelihood that a pass will lead to a goal based on the resulting shot opportunity.",
    {
      aliases: ["xA", "expected assist"],
      domain: ["analytics", "creation"],
      related: ["chance creation", "key pass"],
      type: "metric",
    }
  ),

  concept(
    "Non-Penalty xG",
    "ANALYTICS",
    "Expected goals excluding penalty kicks to isolate open-play and non-penalty shooting output.",
    {
      aliases: ["npxG", "non penalty xG"],
      domain: ["analytics"],
      related: ["xG", "shooting"],
      type: "metric",
    }
  ),

  concept(
    "Shot-Creating Action",
    "ANALYTICS",
    "An offensive action that contributes directly to the creation of a shot according to a defined statistical methodology.",
    {
      aliases: ["SCA", "shot creating action"],
      domain: ["analytics"],
      related: ["chance creation", "xA"],
      type: "metric",
    }
  ),

  concept(
    "Per 90",
    "ANALYTICS",
    "A normalization method expressing a statistic relative to 90 minutes of playing time.",
    {
      aliases: ["per90", "/90"],
      domain: ["analytics"],
      related: ["normalization", "minutes"],
      type: "metric",
    }
  ),

  concept(
    "Percentile",
    "ANALYTICS",
    "A ranking indicating how a player's metric compares with a defined peer group.",
    {
      aliases: ["percentile rank"],
      domain: ["analytics"],
      related: ["benchmarking", "peer group"],
      type: "metric",
    }
  ),

  concept(
    "Field Tilt",
    "ANALYTICS",
    "A measure describing the share of territorial or attacking activity controlled by a team in advanced areas.",
    {
      aliases: ["territorial dominance"],
      domain: ["analytics"],
      related: ["possession", "territory"],
      type: "metric",
    }
  ),

  concept(
    "Possession Value",
    "ANALYTICS",
    "A model-based estimate of the value created by a possession action or game state.",
    {
      aliases: ["PV", "possession value"],
      domain: ["analytics"],
      related: ["progression", "expected threat"],
      type: "metric",
    }
  ),

  concept(
    "Expected Threat",
    "ANALYTICS",
    "A model-based estimate of the likelihood that a location or action will lead to future attacking value.",
    {
      aliases: ["xT", "expected threat"],
      domain: ["analytics"],
      related: ["progression", "possession value"],
      type: "metric",
    }
  ),


  /* ====================================================
     28 — DATA & TRACKING
  ==================================================== */

  concept(
    "Event Data",
    "DATA",
    "Structured records of football actions such as passes, shots, tackles, fouls and recoveries.",
    {
      aliases: ["event data"],
      domain: ["data", "analytics"],
      related: ["tracking data", "performance analysis"],
      type: "data",
    }
  ),

  concept(
    "Tracking Data",
    "DATA",
    "Positional information describing player and ball movement across the pitch over time.",
    {
      aliases: ["tracking", "positional tracking"],
      domain: ["data", "analytics"],
      related: ["GPS", "movement"],
      type: "data",
    }
  ),

  concept(
    "GPS Tracking",
    "DATA",
    "Wearable or positioning technology used to measure player movement and physical output.",
    {
      aliases: ["GPS", "GPS data"],
      domain: ["data", "performance"],
      related: ["high speed running", "load"],
      type: "technology",
    }
  ),

  concept(
    "Heat Map",
    "DATA",
    "A visual representation of where a player or team performs actions or spends time on the pitch.",
    {
      aliases: ["activity map"],
      domain: ["analytics"],
      related: ["tracking data", "positional data"],
      type: "visualization",
    }
  ),


  /* ====================================================
     29 — GAME INTELLIGENCE
  ==================================================== */

  concept(
    "Perception",
    "GAME INTELLIGENCE",
    "The process of detecting and interpreting relevant information from the game environment.",
    {
      aliases: ["game perception"],
      domain: ["cognitive"],
      related: ["scanning", "decision making"],
    }
  ),

  concept(
    "Awareness",
    "GAME INTELLIGENCE",
    "The player's understanding of relevant teammates, opponents, space, time and game context.",
    {
      aliases: ["situational awareness"],
      domain: ["cognitive"],
      related: ["perception", "scanning"],
    }
  ),

  concept(
    "Anticipation",
    "GAME INTELLIGENCE",
    "The ability to predict or recognize likely future actions and situations before they occur.",
    {
      aliases: ["anticipatory ability"],
      domain: ["cognitive"],
      related: ["perception", "decision making"],
    }
  ),

  concept(
    "Game Reading",
    "GAME INTELLIGENCE",
    "The ability to interpret the evolving tactical context and identify relevant actions or threats.",
    {
      aliases: ["reading the game", "game understanding"],
      domain: ["cognitive"],
      related: ["game intelligence", "awareness"],
    }
  ),


  /* ====================================================
     30 — CLUB / TECHNICAL OPERATIONS
  ==================================================== */

  concept(
    "Technical Department",
    "CLUB OPERATIONS",
    "The organizational area responsible for football methodology, sporting strategy and technical development.",
    {
      aliases: ["technical department", "sporting department"],
      domain: ["club operations"],
      related: ["technical director", "football operations"],
    }
  ),

  concept(
    "Technical Director",
    "CLUB OPERATIONS",
    "A senior football leader responsible for strategic technical direction and alignment across football operations.",
    {
      aliases: ["TD", "sporting director"],
      domain: ["club operations"],
      related: ["technical department", "recruitment"],
      type: "role",
    }
  ),

  concept(
    "Football Operations",
    "CLUB OPERATIONS",
    "The operational systems and processes supporting the sporting side of a football organization.",
    {
      aliases: ["football operations"],
      domain: ["club operations"],
      related: ["technical department", "performance"],
    }
  ),

  concept(
    "Football Philosophy",
    "CLUB OPERATIONS",
    "The organization's fundamental beliefs about how football should be understood, developed and played.",
    {
      aliases: ["football philosophy"],
      domain: ["club operations", "methodology"],
      related: ["game model", "methodology"],
    }
  ),


  /* ====================================================
     31 — DPF OS
  ==================================================== */

  concept(
    "Dynamic Positional Football",
    "DPF OS",
    "The DPF football framework built around dynamic relationships, functional space, positional behaviour and coordinated team interaction.",
    {
      aliases: ["DPF", "Dynamic Positional Football"],
      domain: ["DPF OS", "football"],
      related: [
        "functional space",
        "dynamic occupation",
        "positional play",
        "game model",
      ],
      type: "dpf",
    }
  ),

  concept(
    "DPF OS",
    "DPF OS",
    "The Dynamic Positional Football Operating System integrating football philosophy, methodology, development, performance, intelligence and organizational knowledge.",
    {
      aliases: [
        "Dynamic Positional Football Operating System",
        "DPF Operating System",
      ],
      domain: ["DPF", "operating system"],
      related: [
        "game model",
        "player development",
        "scouting",
        "performance analysis",
      ],
      type: "dpf",
    }
  ),

  concept(
    "Dynamic Relationship",
    "DPF OS",
    "A changing tactical relationship between players, space, ball and opposition that continuously influences available actions.",
    {
      aliases: ["dynamic relationships"],
      domain: ["DPF", "tactics"],
      related: ["functional space", "dynamic occupation"],
      type: "dpf",
    }
  ),

  concept(
    "Functional Relationship",
    "DPF OS",
    "A player relationship defined by the function it performs within the team's tactical structure rather than by fixed physical proximity alone.",
    {
      aliases: ["functional relationships"],
      domain: ["DPF", "tactics"],
      related: ["role", "functional space"],
      type: "dpf",
    }
  ),

  concept(
    "Positional Behaviour",
    "DPF OS",
    "The actions and adjustments a player makes in relation to position, space, teammates, opponents and game context.",
    {
      aliases: ["positional behavior"],
      domain: ["DPF", "tactics"],
      related: ["dynamic occupation", "role"],
      type: "dpf",
    }
  ),

  concept(
    "Dynamic Structure",
    "DPF OS",
    "A team structure that continuously adapts to the movement of the ball, players and opposition while maintaining functional relationships.",
    {
      aliases: ["dynamic team structure"],
      domain: ["DPF", "tactics"],
      related: ["game model", "functional space"],
      type: "dpf",
    }
  ),

];


/* ======================================================
   SEARCH ENGINE
====================================================== */


/*
==========================================================
GET FULL GLOSSARY
==========================================================
*/

export function getGlossary() {
  return glossaryEntries;
}


/*
==========================================================
EXACT CONCEPT LOOKUP
==========================================================
*/

export function findGlossaryConcept(
  query = ""
) {
  const normalizedQuery =
    normalizeGlossaryTerm(query);

  if (!normalizedQuery) {
    return [];
  }

  return glossaryEntries.filter((item) => {

    const values = [
      item.term,
      ...(item.aliases || []),
    ];

    return values.some(
      (value) =>
        normalizeGlossaryTerm(value) ===
        normalizedQuery
    );
  });
}


/*
==========================================================
SEARCH GLOSSARY
==========================================================

Priority:

1. Exact term
2. Exact alias
3. Term prefix
4. Alias prefix
5. Term contains
6. Alias contains
7. Category
8. Domain
9. Related concept
10. Definition
==========================================================
*/

export function searchGlossary(
  query = ""
) {
  const normalizedQuery =
    normalizeGlossaryTerm(query);

  if (!normalizedQuery) {
    return [];
  }

  const terms =
    normalizedQuery
      .split(/\s+/)
      .filter(Boolean);


  return glossaryEntries

    .map((item) => {

      let score = 0;

      const term =
        normalizeGlossaryTerm(
          item.term
        );

      const category =
        normalizeGlossaryTerm(
          item.category
        );

      const definition =
        normalizeGlossaryTerm(
          item.definition
        );

      const aliases =
        (item.aliases || [])
          .map(normalizeGlossaryTerm);

      const domains =
        (item.domain || [])
          .map(normalizeGlossaryTerm);

      const related =
        (item.related || [])
          .map(normalizeGlossaryTerm);


      terms.forEach((queryTerm) => {

        /*
        --------------------------------------------------
        EXACT TERM
        --------------------------------------------------
        */

        if (term === queryTerm) {
          score += 300;
        }

        /*
        --------------------------------------------------
        EXACT ALIAS
        --------------------------------------------------
        */

        if (
          aliases.some(
            (alias) =>
              alias === queryTerm
          )
        ) {
          score += 260;
        }

        /*
        --------------------------------------------------
        TERM PREFIX
        --------------------------------------------------
        */

        if (
          term.startsWith(queryTerm)
        ) {
          score += 180;
        }

        /*
        --------------------------------------------------
        ALIAS PREFIX
        --------------------------------------------------
        */

        if (
          aliases.some(
            (alias) =>
              alias.startsWith(queryTerm)
          )
        ) {
          score += 150;
        }

        /*
        --------------------------------------------------
        TERM CONTAINS
        --------------------------------------------------
        */

        if (
          term.includes(queryTerm)
        ) {
          score += 110;
        }

        /*
        --------------------------------------------------
        ALIAS CONTAINS
        --------------------------------------------------
        */

        if (
          aliases.some(
            (alias) =>
              alias.includes(queryTerm)
          )
        ) {
          score += 90;
        }

        /*
        --------------------------------------------------
        CATEGORY
        --------------------------------------------------
        */

        if (
          category.includes(queryTerm)
        ) {
          score += 40;
        }

        /*
        --------------------------------------------------
        DOMAIN
        --------------------------------------------------
        */

        if (
          domains.some(
            (domain) =>
              domain.includes(queryTerm)
          )
        ) {
          score += 35;
        }

        /*
        --------------------------------------------------
        RELATED
        --------------------------------------------------
        */

        if (
          related.some(
            (value) =>
              value.includes(queryTerm)
          )
        ) {
          score += 25;
        }

        /*
        --------------------------------------------------
        DEFINITION
        --------------------------------------------------
        */

        if (
          definition.includes(queryTerm)
        ) {
          score += 15;
        }

      });


      return {
        ...item,
        score,
      };

    })

    .filter(
      (item) =>
        item.score > 0
    )

    .sort(
      (a, b) => {

        if (
          b.score !== a.score
        ) {
          return b.score - a.score;
        }

        return a.term.localeCompare(
          b.term
        );
      }
    );
}


/*
==========================================================
CATEGORY SEARCH
==========================================================
*/

export function searchGlossaryByCategory(
  category = ""
) {
  const normalizedCategory =
    normalizeGlossaryTerm(
      category
    );

  if (!normalizedCategory) {
    return [];
  }

  return glossaryEntries.filter(
    (item) =>
      normalizeGlossaryTerm(
        item.category
      ) === normalizedCategory
  );
}


/*
==========================================================
DOMAIN SEARCH
==========================================================
*/

export function searchGlossaryByDomain(
  domain = ""
) {
  const normalizedDomain =
    normalizeGlossaryTerm(
      domain
    );

  if (!normalizedDomain) {
    return [];
  }

  return glossaryEntries.filter(
    (item) =>
      (item.domain || [])
        .some(
          (value) =>
            normalizeGlossaryTerm(
              value
            ).includes(
              normalizedDomain
            )
        )
  );
}


/*
==========================================================
TYPE SEARCH
==========================================================
*/

export function searchGlossaryByType(
  type = ""
) {
  const normalizedType =
    normalizeGlossaryTerm(
      type
    );

  if (!normalizedType) {
    return [];
  }

  return glossaryEntries.filter(
    (item) =>
      normalizeGlossaryTerm(
        item.type
      ) === normalizedType
  );
}


/*
==========================================================
RELATED CONCEPTS
==========================================================
*/

export function getRelatedGlossaryConcepts(
  term = ""
) {
  const matches =
    findGlossaryConcept(term);

  if (!matches.length) {
    return [];
  }

  const relatedTerms =
    matches[0].related || [];

  return glossaryEntries.filter(
    (item) =>
      relatedTerms.some(
        (related) =>
          normalizeGlossaryTerm(
            related
          ) ===
          normalizeGlossaryTerm(
            item.term
          )
      )
  );
}


/*
==========================================================
GET CONCEPT BY ID
==========================================================
*/

export function getGlossaryConceptById(
  id = ""
) {
  if (!id) {
    return null;
  }

  return (
    glossaryEntries.find(
      (item) =>
        item.id === id
    ) || null
  );
}


/*
==========================================================
GET CONCEPT BY TERM OR ALIAS
==========================================================
*/

export function getGlossaryConcept(
  query = ""
) {
  const matches =
    findGlossaryConcept(query);

  return matches[0] || null;
}


/*
==========================================================
DEFAULT EXPORT
==========================================================
*/

/*
==========================================================
RELATED DPF OS VOLUMES
==========================================================
*/

export function getRelatedVolumes(
  concept = ""
) {
  const query =
    normalizeGlossaryTerm(concept);

  if (!query) {
    return [];
  }

  const matches =
    findGlossaryConcept(query);

  if (!matches.length) {
    return [];
  }

  const item = matches[0];

  /*
  --------------------------------------------------------
  EXPLICIT VOLUME MAPPING
  --------------------------------------------------------
  */

  if (
    Array.isArray(item.volumes) &&
    item.volumes.length
  ) {
    return item.volumes;
  }

  /*
  --------------------------------------------------------
  TEMPORARY FALLBACK
  --------------------------------------------------------
  */

  return [];
}


/*
==========================================================
DEFAULT EXPORT
==========================================================
*/

export default glossaryEntries;