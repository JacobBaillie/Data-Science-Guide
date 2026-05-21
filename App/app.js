/* ── Category registry ── */
const CATEGORIES = {
  statistics_probability: { title: "Statistics & Probability", data: STATS_PROB_DATA },
  machine_learning:       { title: "Machine Learning",        data: ML_DATA },
  my_projects:            { title: "My Projects",             data: MY_PROJECTS_DATA },
  behavioral:             { title: "Behavioral",              data: BEHAVIORAL_DATA },
  python:                 { title: "Python",                   data: PYTHON_DATA },
  packages:               { title: "Pandas, NumPy, MatPlotLib", data: PACKAGES_DATA },
  sql:                    { title: "SQL",                      data: SQL_DATA },
  web_development:        { title: "Web Development",          data: WEB_DEV_DATA }
};

const MODES = {
  all:       "All",
  new:       "New",
  review:    "Review",
  favorites: "Favorites",
  deleted:   "Deleted"
};

const TAG_COLORS = {
  ab_testing:       {bg:'#E1F5EE',bc:'#5DCAA5',tc:'#085041'},
  distributions:    {bg:'#EEEDFE',bc:'#AFA9EC',tc:'#3C3489'},
  probability:      {bg:'#FAEEDA',bc:'#EF9F27',tc:'#633806'},
  regression:       {bg:'#E6F1FB',bc:'#85B7EB',tc:'#0C447C'},
  variance:         {bg:'#FAECE7',bc:'#F0997B',tc:'#712B13'},
  causal_inference: {bg:'#E1F5EE',bc:'#5DCAA5',tc:'#085041'},
  glm:              {bg:'#EEEDFE',bc:'#AFA9EC',tc:'#3C3489'},
  ml_small_data:    {bg:'#FAEEDA',bc:'#EF9F27',tc:'#633806'},
  model_failure:    {bg:'#FCEBEB',bc:'#F09595',tc:'#791F1F'},
  signal_processing:{bg:'#E6F1FB',bc:'#85B7EB',tc:'#0C447C'},
  experimental_design:{bg:'#FAECE7',bc:'#F0997B',tc:'#712B13'},
  pipeline_design:  {bg:'#E1F5EE',bc:'#5DCAA5',tc:'#085041'},
  time_series:      {bg:'#EEEDFE',bc:'#AFA9EC',tc:'#3C3489'},
  etl:              {bg:'#E6F1FB',bc:'#85B7EB',tc:'#0C447C'},
  metrics:          {bg:'#FAEEDA',bc:'#EF9F27',tc:'#633806'},
  uncertainty:      {bg:'#FCEBEB',bc:'#F09595',tc:'#791F1F'},
  global_modeling:  {bg:'#FAECE7',bc:'#F0997B',tc:'#712B13'},
  simulation:       {bg:'#EEEDFE',bc:'#AFA9EC',tc:'#3C3489'},
  cross_functional: {bg:'#E1F5EE',bc:'#5DCAA5',tc:'#085041'},
  data_pipeline:    {bg:'#E6F1FB',bc:'#85B7EB',tc:'#0C447C'},
  anomaly_detection:{bg:'#FCEBEB',bc:'#F09595',tc:'#791F1F'},
  case_study:       {bg:'#FAEEDA',bc:'#EF9F27',tc:'#633806'},
  resilience:       {bg:'#FAECE7',bc:'#F0997B',tc:'#712B13'},
  time_management:  {bg:'#E6F1FB',bc:'#85B7EB',tc:'#0C447C'},
  prioritization:   {bg:'#EEEDFE',bc:'#AFA9EC',tc:'#3C3489'},
  data_driven:      {bg:'#E1F5EE',bc:'#5DCAA5',tc:'#085041'},
  growth:           {bg:'#FAEEDA',bc:'#EF9F27',tc:'#633806'},
  conflict:         {bg:'#FCEBEB',bc:'#F09595',tc:'#791F1F'},
  collaboration:    {bg:'#FAECE7',bc:'#F0997B',tc:'#712B13'},
  adaptability:     {bg:'#E6F1FB',bc:'#85B7EB',tc:'#0C447C'},
  leadership:       {bg:'#E1F5EE',bc:'#5DCAA5',tc:'#085041'}
};

const DIFF_COLORS = {
  easy:   {bg:'#EAF3DE',bc:'#97C459',tc:'#3B6D11'},
  medium: {bg:'#FAEEDA',bc:'#EF9F27',tc:'#633806'},
  hard:   {bg:'#FCEBEB',bc:'#F09595',tc:'#791F1F'}
};

const STATUS_ORDER = { missed: 0, review: 1, new: 2, got: 3 };

/* ── State ── */
var state = {
  page: 'flashcards',  // 'flashcards' | 'notes'
  view: 'home',        // 'home' | 'cards' | 'deleted'
  category: 'statistics_probability',
  mode: 'all',
  topicFilter: 'all',
  diffFilter: 'all',
  deck: [],
  idx: 0,
  shown: false,
  notesCat: 'statistics_probability'
};

/* ── localStorage ── */
var STORAGE_KEY = 'flashcard_state';

function loadUserState() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
  } catch(e) { return {}; }
}

function saveUserState(us) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(us));
}

function getCardState(id) {
  var us = loadUserState();
  return us[id] || { status: 'new', favorite: false, deleted: false };
}

function setCardState(id, updates) {
  var us = loadUserState();
  var cur = us[id] || { status: 'new', favorite: false, deleted: false };
  Object.assign(cur, updates);
  us[id] = cur;
  saveUserState(us);
}

/* ── Helpers ── */
function getTopics(catKey) {
  var data = CATEGORIES[catKey].data;
  var topics = {};
  data.forEach(function(c) { topics[c.topic] = true; });
  return Object.keys(topics).sort();
}

function buildDeck() {
  var data = CATEGORIES[state.category].data;
  var us = loadUserState();

  var cards = data.filter(function(c) {
    var cs = us[c.id] || { status: 'new', favorite: false, deleted: false };

    if (state.mode === 'deleted') return cs.deleted;
    if (cs.deleted) return false;

    if (state.mode === 'new' && cs.status !== 'new') return false;
    if (state.mode === 'review' && cs.status === 'new') return false;
    if (state.mode === 'favorites' && !cs.favorite) return false;

    if (state.topicFilter !== 'all' && c.topic !== state.topicFilter) return false;
    if (state.diffFilter !== 'all' && c.difficulty !== state.diffFilter) return false;

    return true;
  });

  if (state.mode === 'review') {
    cards.sort(function(a, b) {
      var sa = (us[a.id] || {}).status || 'new';
      var sb = (us[b.id] || {}).status || 'new';
      return (STATUS_ORDER[sa] || 2) - (STATUS_ORDER[sb] || 2);
    });
  }

  return cards;
}

/* ── Rendering ── */
function render() {
  var app = document.getElementById('app');

  // Nav bar
  var navHtml = '<div class="nav-bar">' +
    '<button class="nav-tab' + (state.page === 'flashcards' ? ' active' : '') + '" data-page="flashcards">Flashcards</button>' +
    '<button class="nav-tab' + (state.page === 'notes' ? ' active' : '') + '" data-page="notes">Study Notes</button>' +
    '</div>';

  if (state.page === 'notes') {
    app.innerHTML = navHtml + renderNotes();
  } else if (state.view === 'home') {
    app.innerHTML = navHtml + renderHome();
  } else if (state.view === 'deleted') {
    app.innerHTML = navHtml + renderDeleted();
  } else {
    app.innerHTML = navHtml + renderCards();
  }

  bindEvents();
}

function renderHome() {
  var catOptions = Object.keys(CATEGORIES).map(function(k) {
    return '<option value="' + k + '"' + (state.category === k ? ' selected' : '') + '>' + CATEGORIES[k].title + '</option>';
  }).join('');

  var modeOptions = Object.keys(MODES).map(function(k) {
    return '<option value="' + k + '"' + (state.mode === k ? ' selected' : '') + '>' + MODES[k] + '</option>';
  }).join('');

  var topics = getTopics(state.category);
  var topicOptions = '<option value="all">All Topics</option>' + topics.map(function(t) {
    return '<option value="' + t + '"' + (state.topicFilter === t ? ' selected' : '') + '>' + t.replace(/_/g, ' ') + '</option>';
  }).join('');

  var diffOptions = '<option value="all">All Difficulties</option>' +
    ['easy','medium','hard'].map(function(d) {
      return '<option value="' + d + '"' + (state.diffFilter === d ? ' selected' : '') + '>' + d.charAt(0).toUpperCase() + d.slice(1) + '</option>';
    }).join('');

  var deck = buildDeck();
  var us = loadUserState();
  var stats = { total: deck.length, got: 0, review: 0, missed: 0, new_count: 0 };
  deck.forEach(function(c) {
    var s = (us[c.id] || {}).status || 'new';
    if (s === 'got') stats.got++;
    else if (s === 'review') stats.review++;
    else if (s === 'missed') stats.missed++;
    else stats.new_count++;
  });

  var catData = CATEGORIES[state.category].data;
  var isEmpty = catData.length === 0;
  var placeholder = isEmpty ? '<div class="placeholder-msg">Coming soon — 0 cards</div>' : '';

  return '<h1 class="home-title">Data Science Flashcards</h1>' +
    '<div class="controls">' +
      '<select id="sel-cat">' + catOptions + '</select>' +
      '<select id="sel-mode">' + modeOptions + '</select>' +
      '<select id="sel-topic">' + topicOptions + '</select>' +
      '<select id="sel-diff">' + diffOptions + '</select>' +
    '</div>' +
    '<div class="stats-row">' +
      '<div class="chip"><div class="n">' + stats.total + '</div><div class="l">total</div></div>' +
      '<div class="chip"><div class="n" style="color:#3B6D11">' + stats.got + '</div><div class="l">got it</div></div>' +
      '<div class="chip"><div class="n" style="color:#633806">' + stats.review + '</div><div class="l">review</div></div>' +
      '<div class="chip"><div class="n" style="color:#791F1F">' + stats.missed + '</div><div class="l">missed</div></div>' +
      '<div class="chip"><div class="n" style="color:#3C3489">' + stats.new_count + '</div><div class="l">new</div></div>' +
    '</div>' +
    placeholder +
    '<button class="btn-start" id="btn-start"' + (deck.length === 0 ? ' disabled' : '') + '>' +
      (state.mode === 'deleted' ? 'View Deleted Cards' : 'Start (' + deck.length + ' cards)') +
    '</button>';
}

function renderCards() {
  var deck = state.deck;
  if (!deck.length) return '<div class="placeholder-msg">No cards match your filters.</div>';

  var c = deck[state.idx];
  var cs = getCardState(c.id);
  var tc = TAG_COLORS[c.topic] || {bg:'#F1EFE8',bc:'#B4B2A9',tc:'#444441'};
  var dc = DIFF_COLORS[c.difficulty];

  var eqBlock = c.eq ? '<code class="eq"' + (state.shown ? '' : ' style="display:none"') + '>' + escHtml(c.eq) + '</code>' : '';

  return '<div class="card-view-header">' +
      '<button class="btn-back" id="btn-back">&larr; Back</button>' +
      '<span style="font-size:13px;color:#999">' + CATEGORIES[state.category].title + '</span>' +
    '</div>' +
    '<div class="prog-bg"><div class="prog-fill" style="width:' + ((state.idx + 1) / deck.length * 100).toFixed(1) + '%"></div></div>' +
    '<div class="meta">' +
      '<span>' + (state.idx + 1) + ' / ' + deck.length + '</span>' +
      '<span>' +
        '<span class="tag" style="background:' + tc.bg + ';border:0.5px solid ' + tc.bc + ';color:' + tc.tc + '">' + c.topic.replace(/_/g, ' ') + '</span>' +
        '<span class="diff" style="background:' + dc.bg + ';border:0.5px solid ' + dc.bc + ';color:' + dc.tc + '">' + c.difficulty + '</span>' +
      '</span>' +
    '</div>' +
    '<div class="card" id="card">' +
      '<div class="qlabel">Scenario</div>' +
      '<div class="qtext">' + escHtml(c.q) + '</div>' +
      '<div id="ans-block"' + (state.shown ? '' : ' style="display:none"') + '>' +
        '<div class="hr"></div>' +
        '<div class="alabel">Answer</div>' +
        '<div class="atext">' + escHtml(c.a) + '</div>' +
        eqBlock +
      '</div>' +
      '<div class="hint"' + (state.shown ? ' style="display:none"' : '') + '>Click card to reveal answer</div>' +
    '</div>' +
    '<div class="score-row"' + (state.shown ? '' : ' style="display:none"') + '>' +
      '<button class="sb got" data-score="got">Got it</button>' +
      '<button class="sb rev" data-score="review">Review</button>' +
      '<button class="sb mis" data-score="missed">Missed</button>' +
    '</div>' +
    '<div class="action-row">' +
      '<button class="ab' + (cs.favorite ? ' starred' : '') + '" id="btn-star">' + (cs.favorite ? '★ Starred' : '☆ Star') + '</button>' +
      '<button class="ab delete-btn" id="btn-delete">Delete</button>' +
    '</div>' +
    '<div class="nav-row">' +
      '<button class="nb" id="btn-prev">&larr; Prev</button>' +
      '<button class="nb" id="btn-shuf" style="flex:0.6;font-size:13px;">Shuffle</button>' +
      '<button class="nb pri" id="btn-next">Next &rarr;</button>' +
    '</div>';
}

function renderDeleted() {
  var data = CATEGORIES[state.category].data;
  var us = loadUserState();
  var deleted = data.filter(function(c) {
    return (us[c.id] || {}).deleted;
  });

  var items = deleted.map(function(c) {
    return '<div class="deleted-item">' +
      '<span class="q-preview">' + escHtml(c.q.substring(0, 80)) + '...</span>' +
      '<button class="btn-restore" data-id="' + c.id + '">Restore</button>' +
    '</div>';
  }).join('');

  return '<div class="card-view-header">' +
      '<button class="btn-back" id="btn-back">&larr; Back</button>' +
      '<span style="font-size:13px;color:#999">Deleted — ' + CATEGORIES[state.category].title + '</span>' +
    '</div>' +
    '<div class="deleted-list">' +
      (items || '<div class="placeholder-msg">No deleted cards.</div>') +
    '</div>';
}

function renderNotes() {
  var catOptions = Object.keys(NOTES).map(function(k) {
    return '<option value="' + k + '"' + (state.notesCat === k ? ' selected' : '') + '>' + NOTES[k].title + '</option>';
  }).join('');

  var md = NOTES[state.notesCat].content;
  var headers = extractHeaders(md);
  var html = renderMarkdown(md);

  var sidebarItems = headers.map(function(h) {
    return '<a class="sidebar-link sidebar-h' + h.level + '" href="#' + h.id + '">' + h.text + '</a>';
  }).join('');

  return '<div class="notes-container">' +
    '<select class="notes-select" id="sel-notes-cat">' + catOptions + '</select>' +
    '<div class="notes-layout">' +
      '<nav class="notes-sidebar" id="notes-sidebar">' + sidebarItems + '</nav>' +
      '<div class="notes-content">' + html + '</div>' +
    '</div>' +
    '</div>';
}

function extractHeaders(md) {
  var headers = [];
  var lines = md.split('\n');
  for (var i = 0; i < lines.length; i++) {
    var m = lines[i].match(/^(#{1,3})\s+(.+)/);
    if (m) {
      var text = m[2].replace(/\*\*/g, '').replace(/\*/g, '').replace(/`([^`]+)`/g, '$1');
      var id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
      headers.push({ level: m[1].length, text: text, id: id });
    }
  }
  return headers;
}

/* ── Markdown renderer (simple) ── */
function renderMarkdown(md) {
  var lines = md.split('\n');
  var html = '';
  var inCode = false;
  var codeLang = '';
  var codeLines = [];
  var inTable = false;
  var tableRows = [];
  var inList = false;
  var listType = 'ul';

  function flushTable() {
    if (!tableRows.length) return '';
    var out = '<table>';
    tableRows.forEach(function(row, i) {
      if (i === 1 && row.match(/^[\s|:-]+$/)) return; // separator
      var tag = i === 0 ? 'th' : 'td';
      var cells = row.split('|').filter(function(c) { return c.trim() !== ''; });
      out += '<tr>' + cells.map(function(c) { return '<' + tag + '>' + inlineFormat(c.trim()) + '</' + tag + '>'; }).join('') + '</tr>';
    });
    out += '</table>';
    tableRows = [];
    inTable = false;
    return out;
  }

  function flushList() {
    inList = false;
    return '';
  }

  function inlineFormat(text) {
    // Code spans
    text = text.replace(/`([^`]+)`/g, '<code>$1</code>');
    // Bold + italic
    text = text.replace(/\*\*\*([^*]+)\*\*\*/g, '<strong><em>$1</em></strong>');
    // Bold
    text = text.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
    // Italic
    text = text.replace(/\*([^*]+)\*/g, '<em>$1</em>');
    return text;
  }

  for (var i = 0; i < lines.length; i++) {
    var line = lines[i];

    // Code blocks
    if (line.match(/^```/)) {
      if (inCode) {
        html += '<pre><code>' + escHtml(codeLines.join('\n')) + '</code></pre>';
        codeLines = [];
        inCode = false;
      } else {
        if (inTable) html += flushTable();
        codeLang = line.replace(/^```/, '').trim();
        inCode = true;
      }
      continue;
    }
    if (inCode) {
      codeLines.push(line);
      continue;
    }

    // Table rows
    if (line.match(/^\|/)) {
      if (!inTable) inTable = true;
      tableRows.push(line);
      continue;
    } else if (inTable) {
      html += flushTable();
    }

    // Horizontal rule
    if (line.match(/^---+$/)) {
      html += '<hr>';
      continue;
    }

    // Headers
    var hMatch = line.match(/^(#{1,3})\s+(.+)/);
    if (hMatch) {
      var level = hMatch[1].length;
      var rawText = hMatch[2].replace(/\*\*/g, '').replace(/\*/g, '').replace(/`([^`]+)`/g, '$1');
      var hId = rawText.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
      html += '<h' + level + ' id="' + hId + '">' + inlineFormat(hMatch[2]) + '</h' + level + '>';
      continue;
    }

    // Blockquote
    if (line.match(/^>\s/)) {
      html += '<blockquote>' + inlineFormat(line.replace(/^>\s*/, '')) + '</blockquote>';
      continue;
    }

    // List items
    var liMatch = line.match(/^[-*]\s+(.+)/);
    var olMatch = line.match(/^\d+\.\s+(.+)/);
    if (liMatch) {
      if (!inList) { html += '<ul>'; inList = true; listType = 'ul'; }
      html += '<li>' + inlineFormat(liMatch[1]) + '</li>';
      continue;
    }
    if (olMatch) {
      if (!inList) { html += '<ol>'; inList = true; listType = 'ol'; }
      html += '<li>' + inlineFormat(olMatch[1]) + '</li>';
      continue;
    }
    if (inList && line.trim() === '') {
      html += '</' + listType + '>';
      inList = false;
      continue;
    }

    // Empty line
    if (line.trim() === '') {
      if (inList) { html += '</' + listType + '>'; inList = false; }
      continue;
    }

    // Paragraph
    html += '<p>' + inlineFormat(line) + '</p>';
  }

  if (inTable) html += flushTable();
  if (inList) html += '</' + listType + '>';
  if (inCode) html += '<pre><code>' + escHtml(codeLines.join('\n')) + '</code></pre>';

  return html;
}

function escHtml(t) {
  return t.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}

/* ── Event binding ── */
function bindEvents() {
  // Clean up previous scroll listener
  if (state._scrollCleanup) { state._scrollCleanup(); state._scrollCleanup = null; }

  // Nav tabs
  document.querySelectorAll('.nav-tab').forEach(function(btn) {
    btn.addEventListener('click', function() {
      state.page = this.dataset.page;
      state.view = 'home';
      render();
    });
  });

  // Home controls
  var selCat = document.getElementById('sel-cat');
  if (selCat) {
    selCat.addEventListener('change', function() {
      state.category = this.value;
      state.topicFilter = 'all';
      state.diffFilter = 'all';
      render();
    });
  }

  var selMode = document.getElementById('sel-mode');
  if (selMode) {
    selMode.addEventListener('change', function() {
      state.mode = this.value;
      render();
    });
  }

  var selTopic = document.getElementById('sel-topic');
  if (selTopic) {
    selTopic.addEventListener('change', function() {
      state.topicFilter = this.value;
      render();
    });
  }

  var selDiff = document.getElementById('sel-diff');
  if (selDiff) {
    selDiff.addEventListener('change', function() {
      state.diffFilter = this.value;
      render();
    });
  }

  // Start button
  var btnStart = document.getElementById('btn-start');
  if (btnStart) {
    btnStart.addEventListener('click', function() {
      if (state.mode === 'deleted') {
        state.view = 'deleted';
      } else {
        state.deck = buildDeck();
        state.idx = 0;
        state.shown = false;
        state.view = 'cards';
      }
      render();
    });
  }

  // Back button
  var btnBack = document.getElementById('btn-back');
  if (btnBack) {
    btnBack.addEventListener('click', function() {
      state.view = 'home';
      state.shown = false;
      render();
    });
  }

  // Card click
  var card = document.getElementById('card');
  if (card) {
    card.addEventListener('click', function() {
      state.shown = !state.shown;
      render();
    });
  }

  // Score buttons
  document.querySelectorAll('[data-score]').forEach(function(btn) {
    btn.addEventListener('click', function(e) {
      e.stopPropagation();
      var score = this.dataset.score;
      setCardState(state.deck[state.idx].id, { status: score });
      state.shown = false;
      if (state.idx < state.deck.length - 1) {
        state.idx++;
      } else {
        state.idx = 0;
      }
      render();
    });
  });

  // Star
  var btnStar = document.getElementById('btn-star');
  if (btnStar) {
    btnStar.addEventListener('click', function(e) {
      e.stopPropagation();
      var cs = getCardState(state.deck[state.idx].id);
      setCardState(state.deck[state.idx].id, { favorite: !cs.favorite });
      render();
    });
  }

  // Delete
  var btnDelete = document.getElementById('btn-delete');
  if (btnDelete) {
    btnDelete.addEventListener('click', function(e) {
      e.stopPropagation();
      if (confirm('Remove this card? You can restore it from the Deleted view.')) {
        setCardState(state.deck[state.idx].id, { deleted: true });
        state.deck = buildDeck();
        if (state.idx >= state.deck.length) state.idx = Math.max(0, state.deck.length - 1);
        state.shown = false;
        if (state.deck.length === 0) {
          state.view = 'home';
        }
        render();
      }
    });
  }

  // Nav buttons
  var btnPrev = document.getElementById('btn-prev');
  if (btnPrev) {
    btnPrev.addEventListener('click', function(e) {
      e.stopPropagation();
      state.shown = false;
      state.idx = (state.idx - 1 + state.deck.length) % state.deck.length;
      render();
    });
  }

  var btnNext = document.getElementById('btn-next');
  if (btnNext) {
    btnNext.addEventListener('click', function(e) {
      e.stopPropagation();
      state.shown = false;
      state.idx = (state.idx + 1) % state.deck.length;
      render();
    });
  }

  var btnShuf = document.getElementById('btn-shuf');
  if (btnShuf) {
    btnShuf.addEventListener('click', function(e) {
      e.stopPropagation();
      for (var i = state.deck.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var t = state.deck[i];
        state.deck[i] = state.deck[j];
        state.deck[j] = t;
      }
      state.idx = 0;
      state.shown = false;
      render();
    });
  }

  // Restore buttons (deleted view)
  document.querySelectorAll('.btn-restore').forEach(function(btn) {
    btn.addEventListener('click', function() {
      setCardState(this.dataset.id, { deleted: false });
      render();
    });
  });

  // Notes category select
  var selNotesCat = document.getElementById('sel-notes-cat');
  if (selNotesCat) {
    selNotesCat.addEventListener('change', function() {
      state.notesCat = this.value;
      render();
    });
  }

  // Sidebar smooth scroll + active highlight
  var sidebar = document.getElementById('notes-sidebar');
  if (sidebar) {
    sidebar.querySelectorAll('.sidebar-link').forEach(function(link) {
      link.addEventListener('click', function(e) {
        e.preventDefault();
        var target = document.getElementById(this.getAttribute('href').slice(1));
        if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    });

    // Scroll spy: highlight active section
    var sidebarLinks = sidebar.querySelectorAll('.sidebar-link');
    var headingEls = [];
    sidebarLinks.forEach(function(link) {
      var id = link.getAttribute('href').slice(1);
      var el = document.getElementById(id);
      if (el) headingEls.push({ el: el, link: link });
    });

    if (headingEls.length) {
      function updateActiveLink() {
        var scrollY = window.scrollY + 80;
        var active = headingEls[0];
        for (var i = 0; i < headingEls.length; i++) {
          if (headingEls[i].el.offsetTop <= scrollY) active = headingEls[i];
        }
        sidebarLinks.forEach(function(l) { l.classList.remove('active'); });
        if (active) active.link.classList.add('active');
      }
      window.addEventListener('scroll', updateActiveLink);
      updateActiveLink();
      state._scrollCleanup = function() { window.removeEventListener('scroll', updateActiveLink); };
    }
  }
}

/* ── Init ── */
render();
