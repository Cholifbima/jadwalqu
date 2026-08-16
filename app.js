// ==========================================================================
// JADWALKU STUDIO - THEME 1: STICKY NOTE BENTO JAVASCRIPT ENGINE
// ==========================================================================

const SAMPLE_SCHEDULE = [
  {
    id: 1,
    day: "Senin",
    color: "butter",
    rotate: "-1deg",
    accent: "accent-matcha",
    hasPin: true,
    hasClip: false,
    hasTape: true,
    offsetX: 0,
    offsetY: 0,
    events: [
      { id: "e1", time: "08:00 - 10:30", subject: "Pemrograman Web Lanjut", room: "Lab Komp 3", note: "Bawa laptop dan charger" },
      { id: "e2", time: "10:45 - 12:15", subject: "Struktur Data & Algoritma", room: "R. 201", note: "Latihan Tree & Graph" },
      { id: "e3", time: "13:30 - 15:30", subject: "Kecerdasan Buatan (AI)", room: "R. 204", note: "Kumpul tugas resume paper" }
    ]
  },
  {
    id: 2,
    day: "Selasa",
    color: "matcha",
    rotate: "1deg",
    accent: "accent-sky",
    hasPin: false,
    hasClip: true,
    hasTape: true,
    offsetX: 0,
    offsetY: 0,
    events: [
      { id: "e4", time: "08:30 - 11:00", subject: "Interaksi Manusia Komputer", room: "Studio A", note: "Presentasi Figma Wireframe" },
      { id: "e5", time: "11:15 - 12:45", subject: "Statistika & Probabilitas", room: "R. 105", note: "Kuis kalkulus dasar" },
      { id: "e6", time: "14:00 - 16:00", subject: "Bahasa Inggris Bisnis", room: "R. 102", note: "Quiz vocabulary Bab 4" }
    ]
  },
  {
    id: 3,
    day: "Rabu",
    color: "peach",
    rotate: "-1.2deg",
    accent: "accent-peach",
    hasPin: true,
    hasClip: false,
    hasTape: true,
    offsetX: 0,
    offsetY: 0,
    events: [
      { id: "e7", time: "07:30 - 10:00", subject: "Sistem Basis Data", room: "Lab BD", note: "Review SQL query & index" },
      { id: "e8", time: "10:30 - 12:30", subject: "Etika Profesi IT", room: "Auditorium", note: "Dosen tamu dari industri" },
      { id: "e9", time: "13:30 - 15:00", subject: "Workshop UI/UX Mobile", room: "Lab Studio", note: "Hands-on prototype app" }
    ]
  },
  {
    id: 4,
    day: "Kamis",
    color: "lavender",
    rotate: "0.8deg",
    accent: "accent-purple",
    hasPin: false,
    hasClip: true,
    hasTape: true,
    offsetX: 0,
    offsetY: 0,
    events: [
      { id: "e10", time: "08:30 - 11:00", subject: "Rekayasa Perangkat Lunak", room: "R. 301", note: "Sprint Review Kelompok" },
      { id: "e11", time: "11:15 - 12:45", subject: "Sistem Operasi Linux", room: "Lab OS", note: "Shell scripting & bash" },
      { id: "e12", time: "13:30 - 15:00", subject: "Jaringan Komputer", room: "Lab Net", note: "Praktikum Cisco Packet Tracer" }
    ]
  },
  {
    id: 5,
    day: "Jumat",
    color: "sky",
    rotate: "-0.8deg",
    accent: "accent-matcha",
    hasPin: true,
    hasClip: false,
    hasTape: true,
    offsetX: 0,
    offsetY: 0,
    events: [
      { id: "e13", time: "08:00 - 10:30", subject: "Kewirausahaan Digital", room: "Coworking", note: "Pitching deck 5 menit" },
      { id: "e14", time: "13:30 - 15:30", subject: "Mentoring & Study Club", room: "Perpus Lt.2", note: "Diskusi bab project akhir" }
    ]
  }
];

// App State
let state = {
  ratio: "phone", // phone, desktop, tablet, sticky
  mobileLayout: "dual-column", // dual-column, single-column
  density: "compact", // compact, ultra, comfortable
  bgType: "preset", // preset, custom
  bgTexture: "warm-linen",
  customBgUrl: null,
  scrimType: "scrim-frosted-cream",
  bgBlur: 4,
  bgDim: 45,
  cardOpacity: 90,
  palette: "pastel-study",
  isFreeform: true, // Freeform Drag Anywhere Mode (Default)
  selectedCardIndex: null, // Currently selected card
  activeEditableElement: null, // Currently focused text element
  toggles: {
    washiTape: true,
    pushPin: true,
    paperclip: true,
    frostedCards: true
  },
  schedule: JSON.parse(JSON.stringify(SAMPLE_SCHEDULE)),
  zoom: 70,
  panX: 0,
  panY: 0,
  isPanMode: false,
  draggedCardIndex: null
};

// DOM Elements
const scheduleCanvas = document.getElementById("scheduleCanvas");
const bentoBoard = document.getElementById("bentoBoard");
const scheduleEditorList = document.getElementById("scheduleEditorList");
const currentRatioBadge = document.getElementById("currentRatioBadge");
const currentDimensions = document.getElementById("currentDimensions");
const canvasBgImageLayer = document.getElementById("canvasBgImageLayer");
const canvasScrimLayer = document.getElementById("canvasScrimLayer");
const globalCardToolbar = document.getElementById("globalCardToolbar");

// Canva Ribbon Elements
const canvaTypographyRibbon = document.getElementById("canvaTypographyRibbon");
const activeElementLabel = document.getElementById("activeElementLabel");
const canvaFontDropdownWrap = document.getElementById("canvaFontDropdownWrap");
const fontDropdownTrigger = document.getElementById("fontDropdownTrigger");
const currentFontName = document.getElementById("currentFontName");
const canvaFontMenu = document.getElementById("canvaFontMenu");
const fontSizeDisplay = document.getElementById("fontSizeDisplay");
const btnFontSizeDec = document.getElementById("btnFontSizeDec");
const btnFontSizeInc = document.getElementById("btnFontSizeInc");
const textColorPicker = document.getElementById("textColorPicker");
const btnToggleBold = document.getElementById("btnToggleBold");
const btnToggleItalic = document.getElementById("btnToggleItalic");
const btnToggleUnderline = document.getElementById("btnToggleUnderline");
const btnAlignLeft = document.getElementById("btnAlignLeft");
const btnAlignCenter = document.getElementById("btnAlignCenter");
const btnAlignRight = document.getElementById("btnAlignRight");
const btnToggleFreeform = document.getElementById("btnToggleFreeform");
const btnResetPositions = document.getElementById("btnResetPositions");
const freeformStatusIcon = document.getElementById("freeformStatusIcon");
const freeformStatusText = document.getElementById("freeformStatusText");

// Coordinate HUD & Smart Guides
const canvaCoordHud = document.getElementById("canvaCoordHud");
const coordDivider = document.getElementById("coordDivider");
const inputCoordX = document.getElementById("inputCoordX");
const inputCoordY = document.getElementById("inputCoordY");
const inputCoordRot = document.getElementById("inputCoordRot");
const guideLineX = document.getElementById("guideLineX");
const guideLineY = document.getElementById("guideLineY");
const floatingCoordTooltip = document.getElementById("floatingCoordTooltip");

// History Stack for Undo / Redo
const historyStack = [];
let historyIndex = -1;
const MAX_HISTORY = 30;

function saveStateToHistory() {
  if (historyIndex < historyStack.length - 1) {
    historyStack.splice(historyIndex + 1);
  }
  
  const snapshot = JSON.stringify({
    schedule: state.schedule,
    ratio: state.ratio,
    palette: state.palette,
    decorators: state.decorators,
    density: state.density,
    mobileLayout: state.mobileLayout
  });

  if (historyStack.length > 0 && historyStack[historyStack.length - 1] === snapshot) {
    return;
  }

  historyStack.push(snapshot);
  if (historyStack.length > MAX_HISTORY) {
    historyStack.shift();
  } else {
    historyIndex++;
  }
  updateHistoryButtons();
}

function undo() {
  if (historyIndex > 0) {
    historyIndex--;
    restoreSnapshot(historyStack[historyIndex]);
  }
}

function redo() {
  if (historyIndex < historyStack.length - 1) {
    historyIndex++;
    restoreSnapshot(historyStack[historyIndex]);
  }
}

function applyAllDecoratorStates() {
  const decMap = {
    headerStamp: { id: "decoratorHeaderStamp", toggleId: "toggleHeaderStamp" },
    headerGoals: { id: "decoratorHeaderGoals", toggleId: "toggleHeaderGoals" },
    footerBarcode: { id: "decoratorFooterBarcode", toggleId: "toggleFooterBarcode" },
    footerQuote: { id: "decoratorFooterQuote", toggleId: "toggleFooterQuote" }
  };

  if (!state.decorators) return;

  Object.keys(decMap).forEach(key => {
    const item = decMap[key];
    const el = document.getElementById(item.id);
    const toggleEl = document.getElementById(item.toggleId);
    const dData = state.decorators[key];
    if (!el || !dData) return;

    el.style.display = dData.visible === false ? "none" : "";
    el.style.transform = `translate3d(${dData.offsetX || 0}px, ${dData.offsetY || 0}px, 0) rotate(${dData.rotate || 0}deg)`;

    if (key === "headerGoals" && dData.color) {
      el.className = `header-pinned-note canva-decorator-element card-color-${dData.color}`;
    }

    if (toggleEl) {
      toggleEl.checked = dData.visible !== false;
    }
  });
}

function restoreSnapshot(jsonStr) {
  try {
    const data = JSON.parse(jsonStr);
    state.schedule = data.schedule;
    if (data.ratio !== undefined) state.ratio = data.ratio;
    if (data.palette !== undefined) state.palette = data.palette;
    if (data.density !== undefined) state.density = data.density;
    if (data.mobileLayout !== undefined) state.mobileLayout = data.mobileLayout;

    if (data.decorators !== undefined) {
      state.decorators = JSON.parse(JSON.stringify(data.decorators));
      applyAllDecoratorStates();
    }

    renderScheduleCanvas();
    renderSidebarEditor();
    updateModeToggleButton();
    updateHistoryButtons();
  } catch (err) {
    console.error("Failed to restore history snapshot:", err);
  }
}

function updateHistoryButtons() {
  const btnUndo = document.getElementById("btnUndo");
  const btnRedo = document.getElementById("btnRedo");
  if (btnUndo) btnUndo.disabled = historyIndex <= 0;
  if (btnRedo) btnRedo.disabled = historyIndex >= historyStack.length - 1;
}

function resetToDefaultTemplate() {
  if (confirm("Kembalikan jadwal ke template awal? Semua perubahan posisi dan teks akan direset.")) {
    state.schedule = JSON.parse(JSON.stringify(SAMPLE_SCHEDULE));
    state.isFreeform = false;
    state.selectedCardIndex = null;
    state.activeEditableElement = null;
    renderScheduleCanvas();
    renderSidebarEditor();
    updateModeToggleButton();
    saveStateToHistory();
  }
}

// Zoom Functions
function adjustZoom(delta) {
  let newZoom = Math.max(30, Math.min(200, state.zoom + delta));
  state.zoom = newZoom;
  applyZoom();
}

function applyZoom() {
  const zoomLevelText = document.getElementById("zoomLevelText");
  const canvasStageWrapper = document.getElementById("canvasStageWrapper");
  if (zoomLevelText) zoomLevelText.textContent = `${Math.round(state.zoom)}%`;
  if (canvasStageWrapper) {
    canvasStageWrapper.style.transform = `translate3d(${state.panX}px, ${state.panY}px, 0) scale(${state.zoom / 100})`;
    canvasStageWrapper.style.transformOrigin = "center center";
  }
}

// Touch Gestures & Mouse Drag Engine for Unlimited Canvas Panning
function setupMobileCanvasTouchGestures() {
  const canvasViewport = document.getElementById("canvasViewport");
  if (!canvasViewport) return;

  let isViewportPanning = false;
  let startPanX = 0;
  let startPanY = 0;
  let initialPanX = 0;
  let initialPanY = 0;

  let initialPinchDistance = 0;
  let initialZoom = 70;
  let isPinching = false;

  // Double click zoom text or badge to reset pan & zoom to center
  const zoomPill = document.querySelector(".zoom-pill-wrap");
  if (zoomPill) {
    zoomPill.addEventListener("dblclick", () => {
      state.panX = 0;
      state.panY = 0;
      state.zoom = 70;
      applyZoom();
    });
  }

  // Touch handlers for mobile (Pinch zoom + 1-finger viewport pan)
  canvasViewport.addEventListener("touchstart", (e) => {
    // STRICT LOCK: If state.isPanMode is OFF, lock pan and pinch-zoom completely!
    if (!state.isPanMode) return;

    if (e.touches.length === 2) {
      isPinching = true;
      isViewportPanning = false;
      const dx = e.touches[0].clientX - e.touches[1].clientX;
      const dy = e.touches[0].clientY - e.touches[1].clientY;
      initialPinchDistance = Math.hypot(dx, dy);
      initialZoom = state.zoom;
    } else if (e.touches.length === 1) {
      const isUI = e.target.closest(".canva-typography-ribbon") || e.target.closest(".sidebar") || e.target.closest(".preview-toolbar");
      if (!isUI) {
        isViewportPanning = true;
        startPanX = e.touches[0].clientX;
        startPanY = e.touches[0].clientY;
        initialPanX = state.panX;
        initialPanY = state.panY;
      }
    }
  }, { passive: true });

  canvasViewport.addEventListener("touchmove", (e) => {
    // ALWAYS prevent mobile browser native page scrolling on canvas
    if (e.cancelable) e.preventDefault();

    // STRICT LOCK: If state.isPanMode is OFF, ignore move gestures!
    if (!state.isPanMode) return;

    if (isPinching && e.touches.length === 2) {
      const dx = e.touches[0].clientX - e.touches[1].clientX;
      const dy = e.touches[0].clientY - e.touches[1].clientY;
      const currentDist = Math.hypot(dx, dy);
      if (initialPinchDistance > 0) {
        const factor = currentDist / initialPinchDistance;
        let newZoom = Math.max(30, Math.min(200, Math.round(initialZoom * factor)));
        state.zoom = newZoom;
        applyZoom();
      }
    } else if (isViewportPanning && e.touches.length === 1) {
      const dx = e.touches[0].clientX - startPanX;
      const dy = e.touches[0].clientY - startPanY;
      state.panX = initialPanX + dx;
      state.panY = initialPanY + dy;
      applyZoom();
    }
  }, { passive: false });

  canvasViewport.addEventListener("touchend", (e) => {
    if (e.touches.length < 2) {
      isPinching = false;
      initialPinchDistance = 0;
    }
    if (e.touches.length === 0) {
      isViewportPanning = false;
    }
  }, { passive: true });

  // Mouse Drag Panning for Desktop
  canvasViewport.addEventListener("mousedown", (e) => {
    // Panning is strictly LOCKED when state.isPanMode is OFF!
    if (!state.isPanMode) return;

    const isUI = e.target.closest(".canva-typography-ribbon") || e.target.closest(".sidebar") || e.target.closest(".preview-toolbar");
    if ((e.button === 0 || e.button === 1) && !isUI) {
      isViewportPanning = true;
      startPanX = e.clientX;
      startPanY = e.clientY;
      initialPanX = state.panX;
      initialPanY = state.panY;
      canvasViewport.style.cursor = "grabbing";
    }
  });

  window.addEventListener("mousemove", (e) => {
    if (!isViewportPanning) return;
    const dx = e.clientX - startPanX;
    const dy = e.clientY - startPanY;
    state.panX = initialPanX + dx;
    state.panY = initialPanY + dy;
    applyZoom();
  });

  window.addEventListener("mouseup", () => {
    if (isViewportPanning) {
      isViewportPanning = false;
      canvasViewport.style.cursor = state.isPanMode ? "grab" : "default";
    }
  });
}

function updatePanModeButton() {
  const btn = document.getElementById("btnTogglePanCanvas");
  const label = document.getElementById("panLabel");
  const canvasViewport = document.getElementById("canvasViewport");
  const panModeBanner = document.getElementById("panModeBanner");

  if (state.isPanMode) {
    if (btn) btn.classList.add("active");
    if (label) label.textContent = "Geser Layar: ON";
    if (canvasViewport) {
      canvasViewport.classList.add("pan-mode-enabled");
      canvasViewport.style.cursor = "grab";
    }
    if (panModeBanner) panModeBanner.style.display = "flex";
  } else {
    if (btn) btn.classList.remove("active");
    if (label) label.textContent = "Geser Layar: OFF";
    if (canvasViewport) {
      canvasViewport.classList.remove("pan-mode-enabled");
      canvasViewport.style.cursor = "default";
    }
    if (panModeBanner) panModeBanner.style.display = "none";
  }
}

// Initialize
document.addEventListener("DOMContentLoaded", () => {
  setupEventListeners();
  setupCanvaCanvasTools();
  setupCanvaTypographyRibbon();
  setupCoordinateHudListeners();
  setupKeyboardNudgeListeners();
  setupMobileCanvasTouchGestures();
  setupClassDrawerListeners();
  updateRatioVisuals();
  updateDensityClasses();
  applyCustomBackgroundStyles();
  renderScheduleCanvas();
  renderSidebarEditor();
  updateModeToggleButton();
  updatePanModeButton();
  setupAestheticColorModalListeners();
  saveStateToHistory();
});

function setupClassDrawerListeners() {
  document.getElementById("btnCloseClassDrawer")?.addEventListener("click", closeClassManagementDrawer);
  document.getElementById("classDrawerOverlay")?.addEventListener("click", closeClassManagementDrawer);

  // Direct Button on Bottom Mobile Handle Bar
  document.getElementById("btnOpenClassDrawerDirect")?.addEventListener("click", (e) => {
    e.stopPropagation();
    openClassManagementDrawer(0);
  });

  document.getElementById("btnDrawerAddClass")?.addEventListener("click", () => {
    const activeDay = state.schedule[activeClassDrawerDayIndex];
    if (!activeDay) return;
    if (!activeDay.events) activeDay.events = [];
    activeDay.events.push({
      id: "e" + Date.now(),
      time: "10:00 - 12:00",
      subject: "Mata Kuliah Baru",
      room: "R. 101",
      note: "Catatan penting"
    });
    renderScheduleCanvas();
    renderClassManagementDrawer();
    saveStateToHistory();
  });

  document.getElementById("btnDrawerAddDay")?.addEventListener("click", () => {
    addNewScheduleDay();
    activeClassDrawerDayIndex = state.schedule.length - 1;
    renderClassManagementDrawer();
    saveStateToHistory();
  });
}

// Setup Canva-Style Tools & Global Canvas Controls
function setupCanvaCanvasTools() {
  const btnTogglePanCanvas = document.getElementById("btnTogglePanCanvas");
  if (btnTogglePanCanvas) {
    btnTogglePanCanvas.addEventListener("click", () => {
      state.isPanMode = !state.isPanMode;
      updatePanModeButton();
    });
  }

  const btnCanvaAddDay = document.getElementById("btnCanvaAddDay");
  if (btnCanvaAddDay) {
    btnCanvaAddDay.addEventListener("click", () => {
      addNewScheduleDay();
      saveStateToHistory();
    });
  }

  const btnCanvaAddQuote = document.getElementById("btnCanvaAddQuote");
  if (btnCanvaAddQuote) {
    btnCanvaAddQuote.addEventListener("click", () => {
      const headerStickyNote = document.getElementById("headerStickyNote");
      if (headerStickyNote) {
        headerStickyNote.scrollIntoView({ behavior: "smooth", block: "center" });
        const descEl = headerStickyNote.querySelector(".handwritten-desc");
        if (descEl) descEl.focus();
      }
    });
  }

  // Freeform Mode Switch
  const btnToggleFreeform = document.getElementById("btnToggleFreeform");
  if (btnToggleFreeform) {
    btnToggleFreeform.addEventListener("click", () => {
      state.isFreeform = !state.isFreeform;
      updateModeToggleButton();
      renderScheduleCanvas();
    });
  }


  // History Undo & Redo
  const btnUndo = document.getElementById("btnUndo");
  if (btnUndo) {
    btnUndo.addEventListener("click", undo);
  }
  const btnRedo = document.getElementById("btnRedo");
  if (btnRedo) {
    btnRedo.addEventListener("click", redo);
  }

  // Reset Template Button
  const btnResetTemplate = document.getElementById("btnResetTemplate");
  if (btnResetTemplate) {
    btnResetTemplate.addEventListener("click", resetToDefaultTemplate);
  }
}

function updateModeToggleButton() {
  const freeformStatusText = document.getElementById("freeformStatusText");
  const btnToggleFreeform = document.getElementById("btnToggleFreeform");
  const modeIconSvg = document.getElementById("modeIconSvg");

  if (!btnToggleFreeform) return;

  if (state.isFreeform) {
    scheduleCanvas.classList.add("mode-freeform");
    btnToggleFreeform.classList.add("active");
    if (freeformStatusText) freeformStatusText.textContent = "Tata Kartu: Bebas Geser";
    if (modeIconSvg) {
      modeIconSvg.innerHTML = `<path d="M5 9l-3 3 3 3M9 5l3-3 3 3M15 19l-3 3-3-3M19 9l3 3-3 3M2 12h20M12 2v20" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>`;
    }
    if (btnResetPositions) btnResetPositions.style.display = "inline-flex";
    if (canvaCoordHud) canvaCoordHud.style.display = "inline-flex";
    if (coordDivider) coordDivider.style.display = "block";
  } else {
    scheduleCanvas.classList.remove("mode-freeform");
    btnToggleFreeform.classList.remove("active");
    if (freeformStatusText) freeformStatusText.textContent = "Tata Kartu: Auto-Grid";
    if (modeIconSvg) {
      modeIconSvg.innerHTML = `<rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect>`;
    }
    if (btnResetPositions) btnResetPositions.style.display = "none";
    if (canvaCoordHud) canvaCoordHud.style.display = "none";
    if (coordDivider) coordDivider.style.display = "none";
  }
}

// Reset Offset Positions to Exact Default Grid
if (btnResetPositions) {
  btnResetPositions.addEventListener("click", () => {
    state.schedule.forEach(day => {
      day.offsetX = 0;
      day.offsetY = 0;
    });
    renderScheduleCanvas();
    updateCoordinateHud();
    saveStateToHistory();
  });
}

// Setup Coordinate HUD Inputs
function setupCoordinateHudListeners() {
  if (inputCoordX) {
    inputCoordX.addEventListener("input", (e) => {
      if (state.selectedCardIndex !== null && state.schedule[state.selectedCardIndex]) {
        const day = state.schedule[state.selectedCardIndex];
        day.offsetX = parseInt(e.target.value) || 0;
        updateCardTransform(state.selectedCardIndex);
      }
    });
  }

  if (inputCoordY) {
    inputCoordY.addEventListener("input", (e) => {
      if (state.selectedCardIndex !== null && state.schedule[state.selectedCardIndex]) {
        const day = state.schedule[state.selectedCardIndex];
        day.offsetY = parseInt(e.target.value) || 0;
        updateCardTransform(state.selectedCardIndex);
      }
    });
  }

  if (inputCoordRot) {
    inputCoordRot.addEventListener("input", (e) => {
      if (state.selectedCardIndex !== null && state.schedule[state.selectedCardIndex]) {
        state.schedule[state.selectedCardIndex].rotate = `${parseFloat(e.target.value) || 0}deg`;
        updateCardTransform(state.selectedCardIndex);
      }
    });
  }
}

// Keyboard Nudge Control (Arrow keys move selected card by 1px or 10px with Shift)
function setupKeyboardNudgeListeners() {
  window.addEventListener("keydown", (e) => {
    if (!state.isFreeform || state.selectedCardIndex === null || document.activeElement.isContentEditable || document.activeElement.tagName === "INPUT") {
      return;
    }

    const dayData = state.schedule[state.selectedCardIndex];
    if (!dayData) return;

    const step = e.shiftKey ? 10 : 1;
    let moved = false;

    if (e.key === "ArrowLeft") {
      dayData.offsetX = (dayData.offsetX || 0) - step;
      moved = true;
    } else if (e.key === "ArrowRight") {
      dayData.offsetX = (dayData.offsetX || 0) + step;
      moved = true;
    } else if (e.key === "ArrowUp") {
      dayData.offsetY = (dayData.offsetY || 0) - step;
      moved = true;
    } else if (e.key === "ArrowDown") {
      dayData.offsetY = (dayData.offsetY || 0) + step;
      moved = true;
    }

    if (moved) {
      e.preventDefault();
      updateCardTransform(state.selectedCardIndex);
      updateCoordinateHud();
    }
  });
}

function updateCardTransform(idx) {
  const card = bentoBoard.querySelector(`.sticky-note-card[data-index="${idx}"]`);
  const dayData = state.schedule[idx];
  if (card && dayData) {
    card.style.transform = `translate3d(${dayData.offsetX || 0}px, ${dayData.offsetY || 0}px, 0) rotate(${dayData.rotate || '0deg'})`;
  }
}

function updateCoordinateHud() {
  if (state.selectedCardIndex !== null && state.schedule[state.selectedCardIndex]) {
    const day = state.schedule[state.selectedCardIndex];
    if (inputCoordX) inputCoordX.value = day.offsetX || 0;
    if (inputCoordY) inputCoordY.value = day.offsetY || 0;
    if (inputCoordRot) inputCoordRot.value = parseFloat(day.rotate || 0);
  }
}

// Setup Canva Typography Inspector & Formatting Ribbon
function setupCanvaTypographyRibbon() {
  // Move Font Menu to body to escape any CSS transform/overflow clipping
  if (canvaFontMenu && canvaFontMenu.parentElement !== document.body) {
    document.body.appendChild(canvaFontMenu);
  }

  // 1. Custom Canva Font Dropdown Trigger & Selection
  const updateFontMenuPosition = () => {
    if (!fontDropdownTrigger || !canvaFontMenu) return;
    const rect = fontDropdownTrigger.getBoundingClientRect();
    const menuWidth = Math.min(260, window.innerWidth - 20);
    let left = rect.left;
    if (left + menuWidth > window.innerWidth - 10) {
      left = window.innerWidth - menuWidth - 10;
    }
    if (left < 10) left = 10;
    
    canvaFontMenu.style.position = "fixed";
    canvaFontMenu.style.top = `${rect.bottom + 6}px`;
    canvaFontMenu.style.left = `${left}px`;
    canvaFontMenu.style.width = `${menuWidth}px`;
    canvaFontMenu.style.zIndex = "9999999";
  };

  if (fontDropdownTrigger && canvaFontDropdownWrap) {
    const toggleFontDropdown = (e) => {
      e.stopPropagation();
      e.preventDefault();
      const isCurrentlyOpen = canvaFontMenu && canvaFontMenu.style.display === "block";
      if (isCurrentlyOpen) {
        canvaFontMenu.style.display = "none";
        canvaFontDropdownWrap.classList.remove("is-open");
      } else {
        updateFontMenuPosition();
        canvaFontMenu.style.display = "block";
        canvaFontDropdownWrap.classList.add("is-open");
      }
    };

    fontDropdownTrigger.addEventListener("pointerdown", (e) => e.stopPropagation());
    fontDropdownTrigger.addEventListener("click", toggleFontDropdown);

    // Close dropdown when clicking outside
    window.addEventListener("pointerdown", (e) => {
      if (canvaFontMenu && !canvaFontMenu.contains(e.target) && !fontDropdownTrigger.contains(e.target)) {
        canvaFontMenu.style.display = "none";
        if (canvaFontDropdownWrap) canvaFontDropdownWrap.classList.remove("is-open");
      }
    });

    // Font Menu Items Click & Touch
    if (canvaFontMenu) {
      canvaFontMenu.addEventListener("pointerdown", (e) => e.stopPropagation());
      canvaFontMenu.querySelectorAll(".font-menu-item").forEach(item => {
        const selectFont = (e) => {
          e.preventDefault();
          e.stopPropagation();
          const fontName = item.dataset.font;
          
          let fontCss = `'${fontName}', sans-serif`;
          if (fontName === "Caveat" || fontName === "Kalam") fontCss = `'${fontName}', cursive`;
          else if (fontName === "Playfair Display" || fontName === "DM Serif Display") fontCss = `'${fontName}', serif`;
          else if (fontName === "JetBrains Mono" || fontName === "Space Mono") fontCss = `'${fontName}', monospace`;

          if (state.activeEditableElement) {
            state.activeEditableElement.style.fontFamily = fontCss;
            state.activeEditableElement.dataset.customFont = fontName;
          } else if (state.selectedCardIndex !== null) {
            const card = bentoBoard.querySelector(`.sticky-note-card[data-index="${state.selectedCardIndex}"]`);
            if (card) {
              card.style.fontFamily = fontCss;
              card.querySelectorAll(".canva-editable-text, .sticky-day-name, .event-title, .event-time, .event-room-tag, .event-handwritten-note").forEach(el => {
                el.style.fontFamily = fontCss;
              });
            }
          } else {
            // Apply across canvas
            scheduleCanvas.style.fontFamily = fontCss;
            scheduleCanvas.querySelectorAll(".canva-editable-text, .stamp-pill, .handwritten-title, .sticky-day-name, .event-title").forEach(el => {
              el.style.fontFamily = fontCss;
            });
          }

          if (currentFontName) {
            currentFontName.textContent = fontName;
          }

          canvaFontMenu.querySelectorAll(".font-menu-item").forEach(i => i.classList.remove("active"));
          item.classList.add("active");

          // Automatically close dropdown
          canvaFontMenu.style.display = "none";
          canvaFontDropdownWrap.classList.remove("is-open");
        };

        item.addEventListener("pointerdown", (e) => e.stopPropagation());
        item.addEventListener("click", selectFont);
      });
    }
  }

  // Prevent ribbon clicks from triggering background blurs or deselections
  if (canvaTypographyRibbon) {
    canvaTypographyRibbon.addEventListener("pointerdown", (e) => e.stopPropagation());
  }

  // 2. Font Size Decrement / Increment
  if (btnFontSizeDec) {
    btnFontSizeDec.addEventListener("click", (e) => {
      e.stopPropagation();
      adjustActiveFontSize(-1);
    });
  }
  if (btnFontSizeInc) {
    btnFontSizeInc.addEventListener("click", (e) => {
      e.stopPropagation();
      adjustActiveFontSize(1);
    });
  }

  // 3. Text Color Wheel Picker
  const textColorPicker = document.getElementById("textColorPicker");
  // 3a. Text Color Picker Modal Trigger
  const textColorWrap = document.getElementById("textColorWrap");
  if (textColorWrap) {
    textColorWrap.addEventListener("click", (e) => {
      e.preventDefault();
      const textColorBar = document.getElementById("textColorBar");
      const currentColor = textColorBar ? textColorBar.style.backgroundColor : '#0f172a';
      const hex = rgbToHex(currentColor) || '#0F172A';
      openAestheticColorModal('text', null, hex);
    });
  }

  // 3b. Card Background Color Picker Modal Trigger
  const cardColorWrap = document.getElementById("cardColorWrap");
  if (cardColorWrap) {
    cardColorWrap.addEventListener("click", (e) => {
      e.preventDefault();
      let dayIdx = state.selectedCardIndex;
      if (state.activeEditableElement) {
        const parentCard = state.activeEditableElement.closest(".sticky-note-card");
        if (parentCard && !isNaN(parseInt(parentCard.dataset.index))) {
          dayIdx = parseInt(parentCard.dataset.index);
        }
      }
      const cardColorBar = document.getElementById("cardColorBar");
      const currentColor = cardColorBar ? cardColorBar.style.backgroundColor : '#fff9db';
      const hex = rgbToHex(currentColor) || '#FFF9DB';
      openAestheticColorModal('card', dayIdx, hex);
    });
  }

  // 4. Bold Toggle
  if (btnToggleBold) {
    btnToggleBold.addEventListener("click", (e) => {
      e.stopPropagation();
      if (!state.activeEditableElement) return;
      const currentWeight = window.getComputedStyle(state.activeEditableElement).fontWeight;
      const isBold = parseInt(currentWeight) >= 700 || currentWeight === "bold";
      state.activeEditableElement.style.fontWeight = isBold ? "400" : "800";
      btnToggleBold.classList.toggle("active", !isBold);
    });
  }

  // 5. Italic Toggle
  if (btnToggleItalic) {
    btnToggleItalic.addEventListener("click", (e) => {
      e.stopPropagation();
      if (!state.activeEditableElement) return;
      const currentStyle = window.getComputedStyle(state.activeEditableElement).fontStyle;
      const isItalic = currentStyle === "italic";
      state.activeEditableElement.style.fontStyle = isItalic ? "normal" : "italic";
      btnToggleItalic.classList.toggle("active", !isItalic);
    });
  }

  // 6. Underline Toggle
  if (btnToggleUnderline) {
    btnToggleUnderline.addEventListener("click", (e) => {
      e.stopPropagation();
      if (!state.activeEditableElement) return;
      const currentDec = window.getComputedStyle(state.activeEditableElement).textDecorationLine;
      const isUnderlined = currentDec && currentDec.includes("underline");
      state.activeEditableElement.style.textDecoration = isUnderlined ? "none" : "underline";
      btnToggleUnderline.classList.toggle("active", !isUnderlined);
    });
  }

  // 7. Alignments
  if (btnAlignLeft) {
    btnAlignLeft.addEventListener("click", (e) => {
      e.stopPropagation();
      setActiveTextAlign("left");
    });
  }
  if (btnAlignCenter) {
    btnAlignCenter.addEventListener("click", (e) => {
      e.stopPropagation();
      setActiveTextAlign("center");
    });
  }
  if (btnAlignRight) {
    btnAlignRight.addEventListener("click", (e) => {
      e.stopPropagation();
      setActiveTextAlign("right");
    });
  }

  // 8. Close Ribbon Button (✕)
  const btnCloseRibbon = document.getElementById("btnCloseRibbon");
  if (btnCloseRibbon) {
    btnCloseRibbon.addEventListener("click", (e) => {
      e.stopPropagation();
      state.activeEditableElement = null;
      if (canvaTypographyRibbon) canvaTypographyRibbon.classList.remove("is-open");
      if (canvaFontDropdownWrap) canvaFontDropdownWrap.classList.remove("is-open");
      if (canvaFontMenu) canvaFontMenu.style.display = "none";
    });
  }

  // 9. Quick HD Export Button in Header
  const btnQuickExport = document.getElementById("btnQuickExport");
  if (btnQuickExport) {
    btnQuickExport.addEventListener("click", exportHighResWallpaper);
  }
}

function adjustActiveFontSize(delta) {
  if (!state.activeEditableElement) return;
  const currentSize = parseFloat(window.getComputedStyle(state.activeEditableElement).fontSize) || 12;
  const newSize = Math.max(7, Math.min(36, currentSize + delta));
  state.activeEditableElement.style.fontSize = `${newSize}px`;
  fontSizeDisplay.textContent = `${Math.round(newSize)}px`;
}

function setActiveTextAlign(align) {
  if (!state.activeEditableElement) return;
  state.activeEditableElement.style.textAlign = align;
  btnAlignLeft.classList.toggle("active", align === "left");
  btnAlignCenter.classList.toggle("active", align === "center");
  btnAlignRight.classList.toggle("active", align === "right");
}

// Inspect and Update Canva Ribbon When User Focuses Any Text Element
function inspectActiveTextElement(el) {
  state.activeEditableElement = el;

  // Auto slide-down typography ribbon
  if (canvaTypographyRibbon) {
    canvaTypographyRibbon.classList.add("is-open");
  }
  const btnToggleRibbonManual = document.getElementById("btnToggleRibbonManual");
  if (btnToggleRibbonManual) {
    btnToggleRibbonManual.classList.add("active");
  }

  let label = "Teks";
  if (el.classList.contains("stamp-pill")) label = "Header";
  else if (el.classList.contains("handwritten-accent")) label = "Semester";
  else if (el.classList.contains("handwritten-title")) label = "Goals";
  else if (el.classList.contains("handwritten-desc")) label = "Catatan";
  else if (el.classList.contains("sticky-day-name")) label = "Hari";
  else if (el.classList.contains("event-title")) label = "Matkul";
  else if (el.classList.contains("event-time")) label = "Jam";
  else if (el.classList.contains("event-room-tag")) label = "Ruangan";
  else if (el.classList.contains("event-handwritten-note")) label = "Doodle";
  else if (el.classList.contains("barcode-text")) label = "Barcode";
  else if (el.classList.contains("quote-tag")) label = "Kutipan";

  if (activeElementLabel) activeElementLabel.textContent = label;

  const style = window.getComputedStyle(el);

  // 1. Font Size
  const size = Math.round(parseFloat(style.fontSize) || 12);
  if (fontSizeDisplay) fontSizeDisplay.textContent = `${size}px`;

  // 2. Bold / Italic / Underline States
  const weight = parseInt(style.fontWeight) || 400;
  if (btnToggleBold) btnToggleBold.classList.toggle("active", weight >= 700 || style.fontWeight === "bold");
  if (btnToggleItalic) btnToggleItalic.classList.toggle("active", style.fontStyle === "italic");
  if (btnToggleUnderline) btnToggleUnderline.classList.toggle("active", style.textDecorationLine ? style.textDecorationLine.includes("underline") : false);

  // 3. Text Alignment
  const align = style.textAlign || "left";
  if (btnAlignLeft) btnAlignLeft.classList.toggle("active", align === "left" || align === "start");
  if (btnAlignCenter) btnAlignCenter.classList.toggle("active", align === "center");
  if (btnAlignRight) btnAlignRight.classList.toggle("active", align === "right" || align === "end");

  // 4. Font Family
  const rawFont = style.fontFamily.split(",")[0].replace(/['"]/g, "").trim();
  let cleanFontName = "Plus Jakarta Sans";
  const knownFonts = ["Plus Jakarta Sans", "Caveat", "Kalam", "Outfit", "JetBrains Mono", "Playfair Display", "DM Serif Display", "Montserrat", "Space Mono"];
  const matched = knownFonts.find(f => rawFont.toLowerCase().includes(f.toLowerCase()) || f.toLowerCase().includes(rawFont.toLowerCase()));
  if (matched) {
    cleanFontName = matched;
  }
  
  if (currentFontName) {
    currentFontName.textContent = cleanFontName;
  }

  if (canvaFontMenu) {
    canvaFontMenu.querySelectorAll(".font-menu-item").forEach(item => {
      item.classList.toggle("active", item.dataset.font.toLowerCase() === cleanFontName.toLowerCase());
    });
  }

  // Ensure dropdown is always closed cleanly when inspecting new elements
  if (canvaFontDropdownWrap) {
    canvaFontDropdownWrap.classList.remove("is-open");
  }
  if (canvaFontMenu) {
    canvaFontMenu.style.display = "none";
  }

  // 5. Text Color
  try {
    const rgb = style.color;
    const hex = rgbToHex(rgb);
    const textColorPicker = document.getElementById("textColorPicker");
    const textColorBar = document.getElementById("textColorBar");
    if (hex && textColorPicker) {
      textColorPicker.value = hex;
      if (textColorBar) textColorBar.style.backgroundColor = hex;
    }
  } catch (e) {}

  // 6. Card Color Sync (if inside a sticky card)
  try {
    const parentCard = el.closest(".sticky-note-card");
    if (parentCard) {
      const cardBg = window.getComputedStyle(parentCard).backgroundColor;
      const cardHex = rgbToHex(cardBg);
      const cardColorPicker = document.getElementById("cardColorPicker");
      const cardColorBar = document.getElementById("cardColorBar");
      if (cardHex && cardColorPicker) {
        cardColorPicker.value = cardHex;
        if (cardColorBar) cardColorBar.style.backgroundColor = cardHex;
      }
    }
  } catch (e) {}
}

function rgbToHex(rgb) {
  const result = /^rgba?\((\d+),\s*(\d+),\s*(\d+)/i.exec(rgb);
  return result ? "#" + ("0" + parseInt(result[1], 10).toString(16)).slice(-2) +
                      ("0" + parseInt(result[2], 10).toString(16)).slice(-2) +
                      ("0" + parseInt(result[3], 10).toString(16)).slice(-2) : null;
}

// Setup Event Listeners
function setupEventListeners() {
  // Mobile Floating Bottom Sheet Drawer
  const sidebar = document.getElementById("sidebar");
  const drawerHandleBar = document.getElementById("drawerHandleBar");
  const btnToggleDrawer = document.getElementById("btnToggleDrawer");

  if (drawerHandleBar && sidebar) {
    const updateBodyDrawerState = () => {
      const isExpanded = sidebar.classList.contains("is-expanded");
      document.body.classList.toggle("sidebar-is-expanded", isExpanded);
    };

    const toggleDrawer = (e) => {
      e.stopPropagation();
      sidebar.classList.toggle("is-expanded");
      updateBodyDrawerState();
    };

    drawerHandleBar.addEventListener("click", toggleDrawer);

    if (btnToggleDrawer) {
      btnToggleDrawer.addEventListener("click", (e) => {
        e.stopPropagation();
        sidebar.classList.toggle("is-expanded");
        updateBodyDrawerState();
      });
    }

    // Touch Swipe Support on Drawer Handle Bar
    let startTouchY = 0;
    drawerHandleBar.addEventListener("touchstart", (e) => {
      startTouchY = e.touches[0].clientY;
    }, { passive: true });

    drawerHandleBar.addEventListener("touchend", (e) => {
      const endTouchY = e.changedTouches[0].clientY;
      const diffY = endTouchY - startTouchY;
      if (diffY < -30) {
        // Swiped UP -> Expand drawer
        sidebar.classList.add("is-expanded");
        updateBodyDrawerState();
      } else if (diffY > 30) {
        // Swiped DOWN -> Collapse drawer
        sidebar.classList.remove("is-expanded");
        updateBodyDrawerState();
      }
    }, { passive: true });
  }

  // Ratio Buttons
  const ratioButtons = document.querySelectorAll(".ratio-btn");
  ratioButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      ratioButtons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      state.ratio = btn.dataset.ratio;
      updateRatioVisuals();
      renderScheduleCanvas();
      updateCoordinateHud();
    });
  });

  // Helper function to bind interactive embedded chip groups
  function bindChipGroup(containerId, stateKey, onChangeCallback) {
    const group = document.getElementById(containerId);
    if (!group) return;
    const btns = group.querySelectorAll("button");
    btns.forEach(btn => {
      btn.addEventListener("click", () => {
        btns.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        const val = btn.dataset.value;
        if (stateKey) state[stateKey] = val;
        if (onChangeCallback) onChangeCallback(val);
      });
    });
  }

  // 1. Density Chip Group
  bindChipGroup("densityChipGroup", "density", () => updateDensityClasses());

  // 2. Background Type Chip Group (Preset vs Custom)
  const presetBgControls = document.getElementById("presetBgControls");
  const customBgControls = document.getElementById("customBgControls");
  bindChipGroup("bgTypeChipGroup", "bgType", (val) => {
    if (val === "custom") {
      if (presetBgControls) presetBgControls.style.display = "none";
      if (customBgControls) customBgControls.style.display = "block";
      scheduleCanvas.classList.add("has-custom-bg");
    } else {
      if (presetBgControls) presetBgControls.style.display = "block";
      if (customBgControls) customBgControls.style.display = "none";
      scheduleCanvas.classList.remove("has-custom-bg");
    }
    applyCustomBackgroundStyles();
  });

  // 3. Background Texture Chip Group (Preset)
  bindChipGroup("bgTextureChipGroup", "bgTexture", () => updateCanvasBackground());

  // 4. Scrim Filter Blend Chip Group
  bindChipGroup("scrimChipGroup", "scrimType", () => applyCustomBackgroundStyles());

  // 5. Palette Sticky Note Chip Group
  bindChipGroup("paletteChipGroup", "palette", () => {
    applyColorPalette();
  });

  // Custom Image File Input
  const customBgInput = document.getElementById("customBgInput");
  if (customBgInput) {
    customBgInput.addEventListener("change", (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          state.customBgUrl = event.target.result;
          canvasBgImageLayer.style.backgroundImage = `url(${state.customBgUrl})`;
          scheduleCanvas.classList.add("has-custom-bg");
          applyCustomBackgroundStyles();
        };
        reader.readAsDataURL(file);
      }
    });
  }

  // Sliders
  const sliderBgBlur = document.getElementById("sliderBgBlur");
  const blurValueText = document.getElementById("blurValueText");
  if (sliderBgBlur) {
    sliderBgBlur.addEventListener("input", (e) => {
      state.bgBlur = parseInt(e.target.value);
      blurValueText.textContent = `${state.bgBlur}px`;
      applyCustomBackgroundStyles();
    });
  }

  const sliderBgDim = document.getElementById("sliderBgDim");
  const dimValueText = document.getElementById("dimValueText");
  if (sliderBgDim) {
    sliderBgDim.addEventListener("input", (e) => {
      state.bgDim = parseInt(e.target.value);
      dimValueText.textContent = `${state.bgDim}%`;
      applyCustomBackgroundStyles();
    });
  }

  const sliderCardOpacity = document.getElementById("sliderCardOpacity");
  const cardOpacityText = document.getElementById("cardOpacityText");
  if (sliderCardOpacity) {
    sliderCardOpacity.addEventListener("input", (e) => {
      state.cardOpacity = parseInt(e.target.value);
      cardOpacityText.textContent = `${state.cardOpacity}%`;
      applyCustomBackgroundStyles();
    });
  }

  // Toggles
  setupToggle("toggleWashiTape", "washiTape", "hide-washi-tape");
  setupToggle("togglePaperclip", "paperclip", "hide-paperclip");
  setupToggle("toggleHandwritten", "handwritten", "hide-handwritten");
  setupToggle("toggleFrostedCards", "frostedCards", "no-frosted-cards");

  // Reset Sample
  const btnResetSample = document.getElementById("btnResetSample");
  if (btnResetSample) {
    btnResetSample.addEventListener("click", () => {
      state.schedule = JSON.parse(JSON.stringify(SAMPLE_SCHEDULE));
      renderScheduleCanvas();
      renderSidebarEditor();
    });
  }

  // Add Schedule
  const btnAddSchedule = document.getElementById("btnAddSchedule");
  if (btnAddSchedule) {
    btnAddSchedule.addEventListener("click", addNewScheduleDay);
  }

  // Zoom Controls
  const btnZoomIn = document.getElementById("btnZoomIn");
  if (btnZoomIn) {
    btnZoomIn.addEventListener("click", () => adjustZoom(10));
  }
  const btnZoomOut = document.getElementById("btnZoomOut");
  if (btnZoomOut) {
    btnZoomOut.addEventListener("click", () => adjustZoom(-10));
  }

  // Export Button
  const btnExportImage = document.getElementById("btnExportImage");
  if (btnExportImage) {
    btnExportImage.addEventListener("click", exportHighResWallpaper);
  }

  // Deselect Card & Exit Text Editing State when clicking empty canvas viewport
  const canvasViewport = document.getElementById("canvasViewport");
  if (canvasViewport) {
    canvasViewport.addEventListener("pointerdown", (e) => {
      // Don't close or deselect if clicking inside typography ribbon, font menu, or quick toolbar buttons
      if (e.target.closest("#canvaTypographyRibbon") || e.target.closest("#canvaFontMenu") || e.target.closest(".canva-font-menu") || e.target.closest(".canva-tool-action-btn")) {
        return;
      }

      // Exit text editing state if clicking outside of editable text
      if (!e.target.closest(".canva-editable-text")) {
        state.activeEditableElement = null;
        if (canvaTypographyRibbon) canvaTypographyRibbon.classList.remove("is-open");
        if (canvaFontDropdownWrap) canvaFontDropdownWrap.classList.remove("is-open");
        if (canvaFontMenu) canvaFontMenu.style.display = "none";
      }

      // Cancel pending fastener mode if clicking empty canvas viewport area
      if (!e.target.closest(".sticky-note-card") && !e.target.closest(".decor-visual-card") && !e.target.closest(".sidebar")) {
        state.pendingFastenerMode = null;
        const banner = document.getElementById("fastenerGuideBanner");
        if (banner) banner.style.display = "none";
      }

      // Deselect card & hide global quicktool toolbar if clicking outside sticky note card
      if (!e.target.closest(".sticky-note-card") && !e.target.closest("#globalCardToolbar")) {
        deselectAllCardsAndHideToolbar();
      }
    });
  }

  // Global Escape Key to Exit Edit State & Minimize Ribbon + Undo/Redo Keyboard Shortcuts
  window.addEventListener("keydown", (e) => {
    // Keyboard Undo / Redo Shortcuts (Ctrl+Z / Ctrl+Y / Ctrl+Shift+Z)
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "z") {
      if (document.activeElement && (document.activeElement.isContentEditable || document.activeElement.tagName === "INPUT" || document.activeElement.tagName === "TEXTAREA")) return;
      e.preventDefault();
      if (e.shiftKey) {
        redo();
      } else {
        undo();
      }
    } else if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "y") {
      if (document.activeElement && (document.activeElement.isContentEditable || document.activeElement.tagName === "INPUT" || document.activeElement.tagName === "TEXTAREA")) return;
      e.preventDefault();
      redo();
    }

    if (e.key === "Escape") {
      state.activeEditableElement = null;
      state.selectedCardIndex = null;
      document.querySelectorAll(".sticky-note-card").forEach(c => c.classList.remove("canva-selected-card"));
      hideGlobalToolbar();
      if (canvaTypographyRibbon) canvaTypographyRibbon.classList.remove("is-open");
      if (canvaFontDropdownWrap) canvaFontDropdownWrap.classList.remove("is-open");
      if (canvaFontMenu) canvaFontMenu.style.display = "none";
      if (document.activeElement && document.activeElement.classList && document.activeElement.classList.contains("canva-editable-text")) {
        document.activeElement.blur();
      }
    }
  });
}

function setupToggle(elementId, stateKey, cssClass) {
  const el = document.getElementById(elementId);
  if (!el) return;
  el.addEventListener("change", (e) => {
    state.toggles[stateKey] = e.target.checked;
    if (e.target.checked) {
      scheduleCanvas.classList.remove(cssClass);
      if (stateKey === "frostedCards") scheduleCanvas.classList.add("card-glass-frosted");
    } else {
      scheduleCanvas.classList.add(cssClass);
      if (stateKey === "frostedCards") scheduleCanvas.classList.remove("card-glass-frosted");
    }
  });
}

// Apply Background & Filter Custom Properties
function applyCustomBackgroundStyles() {
  scheduleCanvas.style.setProperty("--bg-blur", `${state.bgBlur}px`);
  scheduleCanvas.style.setProperty("--bg-dim", (state.bgDim / 100).toFixed(2));
  scheduleCanvas.style.setProperty("--card-opacity", (state.cardOpacity / 100).toFixed(2));

  // Update scrim class
  if (canvasScrimLayer) {
    canvasScrimLayer.className = `canvas-scrim-layer ${state.scrimType}`;
  }
}

// Update Canvas Ratio Classes & Layout Modes
function updateRatioVisuals() {
  scheduleCanvas.classList.remove(
    "ratio-phone", 
    "ratio-desktop", 
    "ratio-tablet", 
    "ratio-sticky",
    "layout-dual-column",
    "layout-single-column"
  );
  
  scheduleCanvas.classList.add(`ratio-${state.ratio}`);
  if (state.ratio === "phone") {
    scheduleCanvas.classList.add(`layout-${state.mobileLayout}`);
  }

  const infoMap = {
    phone: { badge: "PHONE WALLPAPER (9:16)", dim: "1080 × 1920 px (All-in-One)", defaultZoom: 70 },
    desktop: { badge: "DESKTOP WALLPAPER (16:9)", dim: "1920 × 1080 px (Target Render)", defaultZoom: 75 },
    tablet: { badge: "TABLET PLANNER (4:3)", dim: "2048 × 1536 px (Target Render)", defaultZoom: 80 },
    sticky: { badge: "SOLO STICKY WIDGET (1:1)", dim: "1080 × 1080 px (Target Render)", defaultZoom: 90 }
  };

  if (currentRatioBadge && infoMap[state.ratio]) {
    currentRatioBadge.textContent = infoMap[state.ratio].badge;
  }
  if (currentDimensions && infoMap[state.ratio]) {
    currentDimensions.textContent = infoMap[state.ratio].dim;
  }

  // Show/Hide Mobile Density & Layout Section
  const mobileDensitySection = document.getElementById("mobileDensitySection");
  if (mobileDensitySection) {
    mobileDensitySection.style.display = state.ratio === "phone" ? "block" : "none";
  }

  // Auto-fit zoom
  state.zoom = infoMap[state.ratio].defaultZoom;
  const zoomLevelText = document.getElementById("zoomLevelText");
  if (zoomLevelText) zoomLevelText.textContent = state.zoom + "%";
  
  applyZoom();
}

function updateDensityClasses() {
  scheduleCanvas.classList.remove("density-compact", "density-ultra", "density-comfortable");
  scheduleCanvas.classList.add(`density-${state.density}`);
}

// Update Background
function updateCanvasBackground() {
  scheduleCanvas.className = scheduleCanvas.className.replace(/\bbg-\S+/g, '');
  scheduleCanvas.classList.add(`bg-${state.bgTexture}`);
}

// Palette Mapping Logic
function applyColorPalette() {
  const paletteMaps = {
    "pastel-study": ["butter", "matcha", "peach", "lavender", "sky", "kraft"],
    "warm-autumn": ["butter", "kraft", "peach", "butter", "kraft", "peach"],
    "lavender-dream": ["lavender", "sky", "butter", "lavender", "sky", "butter"],
    "monochrome-paper": ["kraft", "butter", "kraft", "butter", "kraft", "butter"]
  };

  const colors = paletteMaps[state.palette] || paletteMaps["pastel-study"];
  state.schedule.forEach((dayItem, idx) => {
    dayItem.color = colors[idx % colors.length];
  });

  renderScheduleCanvas();
}

// Render Core Schedule Cards with Canva Direct Editing & Relative Offset Engine
function renderScheduleCanvas() {
  updateDensityClasses();
  bentoBoard.innerHTML = "";

  // Auto detect if board needs compact density when max events >= 4 or total items are high
  const maxEventsAcrossBoard = Math.max(0, ...state.schedule.map(d => d.events ? d.events.length : 0));
  if (maxEventsAcrossBoard >= 4) {
    bentoBoard.classList.add("auto-compact-board");
  } else {
    bentoBoard.classList.remove("auto-compact-board");
  }

  // Check if odd count in dual-column mode (e.g., 5 days for Monday-Friday)
  if (state.schedule.length % 2 !== 0 && state.ratio === "phone" && state.mobileLayout === "dual-column") {
    bentoBoard.classList.add("has-odd-cards");
  } else {
    bentoBoard.classList.remove("has-odd-cards");
  }

  state.schedule.forEach((dayData, index) => {
    const card = document.createElement("div");
    const eventCount = dayData.events ? dayData.events.length : 0;

    let densityClass = "";
    if (eventCount >= 5) {
      densityClass = "density-card-heavy";
    } else if (eventCount >= 4) {
      densityClass = "density-card-compact";
    }

    card.className = `sticky-note-card card-color-${dayData.color} ${densityClass}`;
    
    // Apply relative drag offset transform + scale + rotation + stretch
    const baseScale = dayData.scale || 1;
    const curScaleX = (dayData.scaleX || 1) * baseScale;
    const curScaleY = (dayData.scaleY || 1) * baseScale;
    card.style.transform = `translate3d(${dayData.offsetX || 0}px, ${dayData.offsetY || 0}px, 0) rotate(${dayData.rotate || '0deg'}) scale(${curScaleX}, ${curScaleY})`;

    if (dayData.customBgColor) {
      card.style.backgroundColor = dayData.customBgColor;
      card.style.borderColor = dayData.customBgColor;
    }

    card.dataset.index = index;

    if (state.selectedCardIndex === index) {
      card.classList.add("canva-selected-card");
    }

    // Explicitly disable native HTML5 drag ghosting
    card.draggable = false;
    card.ondragstart = (e) => { e.preventDefault(); return false; };

    // --- REAL-TIME CANVA DRAG POINTER ENGINE ---
    if (state.isFreeform) {
      let isPointerDown = false;
      let isDragging = false;
      let startClientX = 0;
      let startClientY = 0;
      let initialX = 0;
      let initialY = 0;

      card.addEventListener("pointerdown", (e) => {
        // Skip card drag if Board Pan Mode is ON
        if (state.isPanMode) return;

        // Only primary mouse button (left click) or single touch
        if (e.button !== 0 && e.pointerType === "mouse") return;

        // Never drag if user is clicking on contenteditable text, resize handle, or buttons/swatches
        if (e.target.closest(".canva-editable-text") || e.target.closest(".canva-selection-handle") || e.target.isContentEditable || e.target.closest(".canva-card-toolbar") || e.target.closest(".canva-event-delete-btn") || e.target.closest("button") || e.target.closest("input")) {
          return;
        }

        // If user is in interactive pending fastener placement mode (Pin / Clip targeting)
        if (state.pendingFastenerMode) {
          if (state.pendingFastenerMode === "pin") {
            dayData.hasPin = true;
            dayData.hasClip = false;
          } else if (state.pendingFastenerMode === "clip") {
            dayData.hasClip = true;
            dayData.hasPin = false;
          }
          state.pendingFastenerMode = null;
          const banner = document.getElementById("fastenerGuideBanner");
          if (banner) banner.style.display = "none";
          renderScheduleCanvas();
          saveStateToHistory();
          return;
        }

        isPointerDown = true;
        isDragging = false;
        startClientX = e.clientX;
        startClientY = e.clientY;
        initialX = dayData.offsetX || 0;
        initialY = dayData.offsetY || 0;

        // Select Card
        state.selectedCardIndex = index;
        document.querySelectorAll(".sticky-note-card").forEach(c => c.classList.remove("canva-selected-card"));
        card.classList.add("canva-selected-card");
        showGlobalToolbar(card, index);
        updateCoordinateHud();

        try {
          card.setPointerCapture(e.pointerId);
        } catch (err) {}
      });

      card.addEventListener("pointermove", (e) => {
        if (!isPointerDown) return;

        const currentZoom = state.zoom / 100;
        const dx = (e.clientX - startClientX) / currentZoom;
        const dy = (e.clientY - startClientY) / currentZoom;

        // Threshold check (must move at least 3px to start dragging)
        if (!isDragging && Math.hypot(dx, dy) < 3) {
          return;
        }

        isDragging = true;
        card.classList.add("is-dragging");

        let newX = Math.round(initialX + dx);
        let newY = Math.round(initialY + dy);

        // Snap back to 0 if near origin
        if (Math.abs(newX) < 4) newX = 0;
        if (Math.abs(newY) < 4) newY = 0;

        card.style.transform = `translate3d(${newX}px, ${newY}px, 0) rotate(${dayData.rotate || '0deg'}) scale(${curScaleX}, ${curScaleY})`;
        dayData.offsetX = newX;
        dayData.offsetY = newY;

        // Update HUD & Tooltip
        if (inputCoordX) inputCoordX.value = newX;
        if (inputCoordY) inputCoordY.value = newY;

        if (floatingCoordTooltip) {
          floatingCoordTooltip.style.display = "block";
          floatingCoordTooltip.textContent = `📍 ΔX: ${newX >= 0 ? '+' : ''}${newX}px  ΔY: ${newY >= 0 ? '+' : ''}${newY}px  ⟳ ${dayData.rotate || '0°'}`;
          floatingCoordTooltip.style.left = `${card.offsetLeft + newX + 10}px`;
          floatingCoordTooltip.style.top = `${Math.max(0, card.offsetTop + newY - 26)}px`;
        }

        // Follow card with global toolbar
        positionGlobalToolbar(card);
      });

      const stopDrag = (e) => {
        if (!isPointerDown) return;
        isPointerDown = false;
        if (isDragging) {
          isDragging = false;
          saveStateToHistory();
        }
        card.classList.remove("is-dragging");

        if (floatingCoordTooltip) floatingCoordTooltip.style.display = "none";
        if (guideLineX) guideLineX.style.display = "none";
        if (guideLineY) guideLineY.style.display = "none";

        try {
          card.releasePointerCapture(e.pointerId);
        } catch (err) {}
      };

      card.addEventListener("pointerup", stopDrag);
      card.addEventListener("pointercancel", stopDrag);
      card.addEventListener("lostpointercapture", stopDrag);
    } else {
      // Standard Grid Snap Click Select
      card.addEventListener("click", () => {
        state.selectedCardIndex = index;
        document.querySelectorAll(".sticky-note-card").forEach(c => c.classList.remove("canva-selected-card"));
        card.classList.add("canva-selected-card");
        updateCoordinateHud();
      });
    }

    // Determine smart toolbar alignment (left, right, center) to prevent canvas edge clipping
    const isTwoCol = (state.columns === 2 || !state.isFreeform);
    let toolbarAlignClass = "toolbar-align-center";
    if (isTwoCol) {
      toolbarAlignClass = (index % 2 === 0) ? "toolbar-align-left" : "toolbar-align-right";
    }

    // Canva Floating Context Toolbar for Card
    const hasPin = dayData.hasPin !== false;
    const hasClip = dayData.hasClip !== false;
    const hasTape = dayData.hasTape !== false;

    const cardToolbar = `
      <div class="canva-card-toolbar ${toolbarAlignClass}">
        <button class="canva-btn-mini btn-canvas-add-event" data-day="${index}" title="Tambah Mata Kuliah">+ Matkul</button>
        <div class="canva-color-swatches">
          <span class="canva-swatch swatch-butter" data-day="${index}" data-color="butter" title="Kuning Butter"></span>
          <span class="canva-swatch swatch-matcha" data-day="${index}" data-color="matcha" title="Hijau Matcha"></span>
          <span class="canva-swatch swatch-peach" data-day="${index}" data-color="peach" title="Peach"></span>
          <span class="canva-swatch swatch-lavender" data-day="${index}" data-color="lavender" title="Lavender"></span>
          <span class="canva-swatch swatch-sky" data-day="${index}" data-color="sky" title="Sky Blue"></span>
          <button type="button" class="canva-card-color-wheel-btn btn-open-card-color-modal" data-day="${index}" title="Aesthetic Color Palette & Wheel Picker">
            <span class="color-wheel-swatch-icon">🎨</span>
          </button>
        </div>
        <button type="button" class="canva-btn-mini btn-card-toggle-pin ${hasPin ? 'active-dec-btn' : ''}" data-day="${index}" title="Toggle Push Pin 📍 Note Ini">📍 Pin</button>
        <button type="button" class="canva-btn-mini btn-card-toggle-clip ${hasClip ? 'active-dec-btn' : ''}" data-day="${index}" title="Toggle Paperclip 📎 Note Ini">📎 Clip</button>
        <button type="button" class="canva-btn-mini btn-card-toggle-tape ${hasTape ? 'active-dec-btn' : ''}" data-day="${index}" title="Toggle Washi Tape 🎗️ Note Ini">🎗️ Tape</button>
        <button class="canva-btn-mini btn-canvas-rotate-left" data-day="${index}" title="Putar Kiri">⟲</button>
        <button class="canva-btn-mini btn-canvas-rotate-right" data-day="${index}" title="Putar Kanan">⟳</button>
        <button class="canva-btn-mini btn-canvas-delete-day" data-day="${index}" style="color: #f87171;" title="Hapus Hari">✕</button>
      </div>
    `;

    // 8 Corner & Edge Interactive Transformation Handles (Canva Studio System)
    const selectionHandles = `
      <div class="canva-selection-handle handle-tl" data-handle="tl" data-day="${index}" title="Skala Proporsional"></div>
      <div class="canva-selection-handle handle-tr" data-handle="tr" data-day="${index}" title="Skala Proporsional"></div>
      <div class="canva-selection-handle handle-bl" data-handle="bl" data-day="${index}" title="Skala Proporsional"></div>
      <div class="canva-selection-handle handle-br" data-handle="br" data-day="${index}" title="Skala Proporsional"></div>
      <div class="canva-selection-handle handle-l" data-handle="l" data-day="${index}" title="Stretch Lebar (Kiri)"></div>
      <div class="canva-selection-handle handle-r" data-handle="r" data-day="${index}" title="Stretch Lebar (Kanan)"></div>
      <div class="canva-selection-handle handle-t" data-handle="t" data-day="${index}" title="Stretch Tinggi (Atas)"></div>
      <div class="canva-selection-handle handle-b" data-handle="b" data-day="${index}" title="Stretch Tinggi (Bawah)"></div>
    `;

    // Minimalist Tape & Fastener Elements (Pin vs Paperclip are Mutually Exclusive)
    const tapeColorClass = getTapeClass(dayData.color);
    const showTape = (state.toggles.washiTape !== false) && (dayData.hasTape !== false);
    
    // Fastener Selection: Clip takes priority if explicitly enabled on card, otherwise Pin
    const isClip = (dayData.hasClip === true);
    const isPin = (dayData.hasPin !== false) && !isClip;

    const showPin = (state.toggles.pushPin !== false) && isPin;
    const showClip = (state.toggles.paperclip !== false) && isClip;

    const washiTape = showTape ? `<div class="washi-tape ${tapeColorClass}"></div>` : "";
    
    let fastenerHtml = "";
    if (showClip) {
      fastenerHtml = `<div class="pin-clip pin-mode-clip"><div class="minimal-clip"></div></div>`;
    } else if (showPin) {
      fastenerHtml = `<div class="pin-clip pin-mode-push"><div class="minimal-pin"></div></div>`;
    }

    // Events HTML (contenteditable="false" by default, activates on double-click)
    let eventsHtml = "";
    dayData.events.forEach((evt, evtIndex) => {
      const shortTime = evt.time.split(" - ")[0] || evt.time;
      const hasRoom = evt.room && evt.room.trim() !== "" && evt.room.trim() !== "-";
      const roomHtml = hasRoom ? `<span class="event-room-tag canva-editable-text" contenteditable="false" spellcheck="false" data-day="${index}" data-evt="${evtIndex}" data-field="room" title="Klik 2x untuk edit ruangan">${evt.room}</span>` : '';
      const cleanNote = evt.note ? evt.note.replace(/^―\s*/, '').trim() : '';

      eventsHtml += `
        <div class="sticky-event-item ${dayData.accent || 'accent-matcha'}" data-day="${index}" data-evt="${evtIndex}">
          <button class="canva-event-delete-btn" data-day="${index}" data-evt="${evtIndex}" title="Hapus Kelas Ini">✕</button>
          <div class="event-time-row">
            <span class="event-time canva-editable-text" contenteditable="false" spellcheck="false" data-day="${index}" data-evt="${evtIndex}" data-field="time" title="Klik 2x untuk edit jam">${evt.time}</span>
            ${roomHtml}
          </div>
          <div class="event-title canva-editable-text" contenteditable="false" spellcheck="false" data-time="${shortTime}" data-day="${index}" data-evt="${evtIndex}" data-field="subject" title="Klik 2x untuk edit nama matkul">${evt.subject}</div>
          ${cleanNote !== '' ? `<div class="event-handwritten-note canva-editable-text" contenteditable="false" spellcheck="false" data-day="${index}" data-evt="${evtIndex}" data-field="note" title="Klik 2x untuk edit catatan">― ${cleanNote}</div>` : ''}
        </div>
      `;
    });

    const dragHandleHtml = `<span class="freeform-drag-handle" title="Grip Indicator">⠿ </span>`;

    card.innerHTML = `
      ${selectionHandles}
      ${washiTape}
      ${fastenerHtml}
      <div class="sticky-day-header">
        <span class="sticky-day-name canva-editable-text" contenteditable="false" spellcheck="false" data-day="${index}" data-field="day" title="Klik 2x untuk edit nama hari">${dragHandleHtml}${dayData.day}</span>
        <span class="sticky-item-count">${dayData.events.length}</span>
      </div>
      <div class="sticky-events-list">
        ${eventsHtml}
      </div>
    `;

    bentoBoard.appendChild(card);
  });

  // Attach direct on-canvas event listeners
  attachCanvaDirectEditingListeners();
}

// Attach Live Canvas Interaction Listeners
function attachCanvaDirectEditingListeners() {
  // 1. Canva Double-Click Inline Text Editing & Inspector Sync
  document.querySelectorAll(".canva-editable-text").forEach(el => {
    el.addEventListener("pointerdown", (e) => {
      e.stopPropagation();
    });

    let lastTap = 0;
    const enterDirectEdit = (e) => {
      e.stopPropagation();
      el.contentEditable = "true";
      el.classList.add("is-text-editing");
      el.focus();

      try {
        const range = document.createRange();
        range.selectNodeContents(el);
        const sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);
      } catch (err) {}

      inspectActiveTextElement(el);
    };

    // Double-click to enter direct text editing mode
    el.addEventListener("dblclick", enterDirectEdit);

    // Single click / tap to inspect, rapid double tap for mobile editing
    el.addEventListener("click", (e) => {
      if (el.contentEditable === "true") {
        e.stopPropagation();
        return;
      }
      const now = Date.now();
      if (now - lastTap < 350 && now - lastTap > 0) {
        enterDirectEdit(e);
      } else {
        inspectActiveTextElement(el);
      }
      lastTap = now;
    });

    // Finish editing on blur
    el.addEventListener("blur", (e) => {
      el.contentEditable = "false";
      el.classList.remove("is-text-editing");

      const dayIdx = parseInt(e.target.dataset.day);
      const field = e.target.dataset.field;
      const text = e.target.innerText.replace(/^―\s*/, '').trim();

      if (field === "day" && !isNaN(dayIdx) && state.schedule[dayIdx]) {
        state.schedule[dayIdx].day = text;
        renderSidebarEditor();
        saveStateToHistory();
        return;
      }

      const evtIdx = parseInt(e.target.dataset.evt);
      if (!isNaN(dayIdx) && !isNaN(evtIdx) && state.schedule[dayIdx] && state.schedule[dayIdx].events[evtIdx]) {
        state.schedule[dayIdx].events[evtIdx][field] = text;
        renderSidebarEditor();
        saveStateToHistory();
      }
    });

    // Enter or Escape finishes editing
    el.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        el.blur();
      } else if (e.key === "Escape") {
        el.blur();
      }
    });
  });

  // 1b. Interactive 8-Point Drag-to-Resize & Stretch Handles (Corner Scale + Edge Stretch)
  document.querySelectorAll(".canva-selection-handle").forEach(handle => {
    handle.addEventListener("pointerdown", (e) => {
      e.stopPropagation();
      e.preventDefault();
      const dayIdx = parseInt(handle.dataset.day);
      const dayData = state.schedule[dayIdx];
      const card = bentoBoard.querySelector(`.sticky-note-card[data-index="${dayIdx}"]`);
      if (!dayData || !card) return;

      const handleType = handle.dataset.handle;
      const startX = e.clientX;
      const startY = e.clientY;
      const initialScale = dayData.scale || 1;
      const initialScaleX = dayData.scaleX || 1;
      const initialScaleY = dayData.scaleY || 1;
      let isResizing = true;

      try {
        handle.setPointerCapture(e.pointerId);
      } catch (err) {}

      const onResizeMove = (moveEvt) => {
        if (!isResizing) return;
        const currentZoom = state.zoom / 100;
        const dx = (moveEvt.clientX - startX) / currentZoom;
        const dy = (moveEvt.clientY - startY) / currentZoom;

        if (handleType === "r" || handleType === "l") {
          // Stretch Width (Lebar)
          const change = handleType === "r" ? dx : -dx;
          let newScaleX = Math.max(0.4, Math.min(3.0, initialScaleX + change / 160));
          newScaleX = Math.round(newScaleX * 100) / 100;
          dayData.scaleX = newScaleX;

          if (floatingCoordTooltip) {
            floatingCoordTooltip.style.display = "block";
            floatingCoordTooltip.textContent = `↔️ Stretch Lebar: ${Math.round(newScaleX * 100)}%`;
            floatingCoordTooltip.style.left = `${card.offsetLeft + (dayData.offsetX || 0) + 10}px`;
            floatingCoordTooltip.style.top = `${Math.max(0, card.offsetTop + (dayData.offsetY || 0) - 26)}px`;
          }
        } else if (handleType === "t" || handleType === "b") {
          // Stretch Height (Tinggi)
          const change = handleType === "b" ? dy : -dy;
          let newScaleY = Math.max(0.4, Math.min(3.0, initialScaleY + change / 160));
          newScaleY = Math.round(newScaleY * 100) / 100;
          dayData.scaleY = newScaleY;

          if (floatingCoordTooltip) {
            floatingCoordTooltip.style.display = "block";
            floatingCoordTooltip.textContent = `↕️ Stretch Tinggi: ${Math.round(newScaleY * 100)}%`;
            floatingCoordTooltip.style.left = `${card.offsetLeft + (dayData.offsetX || 0) + 10}px`;
            floatingCoordTooltip.style.top = `${Math.max(0, card.offsetTop + (dayData.offsetY || 0) - 26)}px`;
          }
        } else {
          // 4 Corner Proportional Scale
          let delta = 0;
          if (handleType === "br") delta = (dx + dy) / 200;
          else if (handleType === "tr") delta = (dx - dy) / 200;
          else if (handleType === "bl") delta = (-dx + dy) / 200;
          else if (handleType === "tl") delta = (-dx - dy) / 200;

          let newScale = Math.max(0.5, Math.min(2.5, initialScale + delta));
          newScale = Math.round(newScale * 100) / 100;
          dayData.scale = newScale;

          if (floatingCoordTooltip) {
            floatingCoordTooltip.style.display = "block";
            floatingCoordTooltip.textContent = `📏 Ukuran Skala: ${Math.round(newScale * 100)}%`;
            floatingCoordTooltip.style.left = `${card.offsetLeft + (dayData.offsetX || 0) + 10}px`;
            floatingCoordTooltip.style.top = `${Math.max(0, card.offsetTop + (dayData.offsetY || 0) - 26)}px`;
          }
        }

        const baseS = dayData.scale || 1;
        const curScaleX = (dayData.scaleX || 1) * baseS;
        const curScaleY = (dayData.scaleY || 1) * baseS;
        card.style.transform = `translate3d(${dayData.offsetX || 0}px, ${dayData.offsetY || 0}px, 0) rotate(${dayData.rotate || '0deg'}) scale(${curScaleX}, ${curScaleY})`;
      };

      const onResizeEnd = (upEvt) => {
        isResizing = false;
        if (floatingCoordTooltip) floatingCoordTooltip.style.display = "none";
        try {
          handle.releasePointerCapture(upEvt.pointerId);
        } catch (err) {}
        window.removeEventListener("pointermove", onResizeMove);
        window.removeEventListener("pointerup", onResizeEnd);
        window.removeEventListener("pointercancel", onResizeEnd);
        saveStateToHistory();
      };

      window.addEventListener("pointermove", onResizeMove);
      window.addEventListener("pointerup", onResizeEnd);
      window.addEventListener("pointercancel", onResizeEnd);
    });
  });

  // 2. On-Canvas Card Action Bar (+ Matkul)
  bentoBoard.querySelectorAll(".btn-canvas-add-event").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const dayIdx = parseInt(btn.dataset.day);
      state.schedule[dayIdx].events.push({
        id: "e" + Date.now(),
        time: "10:00 - 12:00",
        subject: "Matkul Baru",
        room: "R. 101",
        note: "Catatan penting"
      });
      renderScheduleCanvas();
      renderSidebarEditor();
      saveStateToHistory();
    });
  });

  // 3. On-Canvas Color Swatches
  bentoBoard.querySelectorAll(".canva-swatch").forEach(swatch => {
    swatch.addEventListener("click", (e) => {
      e.stopPropagation();
      const dayIdx = parseInt(swatch.dataset.day);
      const color = swatch.dataset.color;
      state.schedule[dayIdx].color = color;
      delete state.schedule[dayIdx].customBgColor; // Fix bug: clear custom inline color so preset swatch takes effect!
      renderScheduleCanvas();
      renderSidebarEditor();
      saveStateToHistory();
    });
  });

  // 3.5 On-Canvas Open Aesthetic Color Palette & Wheel Modal
  bentoBoard.querySelectorAll(".btn-open-card-color-modal").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const dayIdx = parseInt(btn.dataset.day);
      const currentColor = state.schedule[dayIdx].customBgColor || '#fff9db';
      openAestheticColorModal('card', dayIdx, currentColor);
    });
  });

  // 3.8 On-Canvas Per-Card Decoration Toggle Buttons (Pin, Clip, Tape)
  bentoBoard.querySelectorAll(".btn-card-toggle-pin").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const dayIdx = parseInt(btn.dataset.day);
      if (state.schedule[dayIdx]) {
        state.schedule[dayIdx].hasPin = (state.schedule[dayIdx].hasPin === false) ? true : false;
        renderScheduleCanvas();
        saveStateToHistory();
      }
    });
  });

  bentoBoard.querySelectorAll(".btn-card-toggle-clip").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const dayIdx = parseInt(btn.dataset.day);
      if (state.schedule[dayIdx]) {
        state.schedule[dayIdx].hasClip = (state.schedule[dayIdx].hasClip === false) ? true : false;
        renderScheduleCanvas();
        saveStateToHistory();
      }
    });
  });

  bentoBoard.querySelectorAll(".btn-card-toggle-tape").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const dayIdx = parseInt(btn.dataset.day);
      if (state.schedule[dayIdx]) {
        state.schedule[dayIdx].hasTape = (state.schedule[dayIdx].hasTape === false) ? true : false;
        renderScheduleCanvas();
        saveStateToHistory();
      }
    });
  });

  // 4. On-Canvas Rotate Left & Right
  bentoBoard.querySelectorAll(".btn-canvas-rotate-left").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const dayIdx = parseInt(btn.dataset.day);
      const currentRot = parseFloat(state.schedule[dayIdx].rotate || 0);
      state.schedule[dayIdx].rotate = `${(currentRot - 1).toFixed(1)}deg`;
      renderScheduleCanvas();
      renderSidebarEditor();
      updateCoordinateHud();
      saveStateToHistory();
    });
  });

  bentoBoard.querySelectorAll(".btn-canvas-rotate-right").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const dayIdx = parseInt(btn.dataset.day);
      const currentRot = parseFloat(state.schedule[dayIdx].rotate || 0);
      state.schedule[dayIdx].rotate = `${(currentRot + 1).toFixed(1)}deg`;
      renderScheduleCanvas();
      renderSidebarEditor();
      updateCoordinateHud();
      saveStateToHistory();
    });
  });

  // 5. On-Canvas Delete Day
  bentoBoard.querySelectorAll(".btn-canvas-delete-day").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const dayIdx = parseInt(btn.dataset.day);
      state.schedule.splice(dayIdx, 1);
      renderScheduleCanvas();
      renderSidebarEditor();
      saveStateToHistory();
    });
  });

  // 6. On-Canvas Delete Single Event Item
  bentoBoard.querySelectorAll(".canva-event-delete-btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const dayIdx = parseInt(btn.dataset.day);
      const evtIdx = parseInt(btn.dataset.evt);
      state.schedule[dayIdx].events.splice(evtIdx, 1);
      renderScheduleCanvas();
      renderSidebarEditor();
      saveStateToHistory();
    });
  });
}

function getTapeClass(color) {
  switch (color) {
    case "peach": return "tape-peach";
    case "matcha": return "tape-sage";
    case "lavender": return "tape-lavender";
    case "sky": return "tape-sky";
    default: return "tape-yellow";
  }
}

// Render Sidebar Editor for Live Tweaks
// ============================================================
// DEDICATED CLASS MANAGEMENT SIDE-OVER DRAWER (RIGHT PANEL)
// ============================================================
// ==========================================================================
// AESTHETIC MODERN CONFIRMATION MODAL HELPER
// ==========================================================================
function showConfirmModal({ title, message, confirmText = "Ya, Hapus", cancelText = "Batal", icon = "🗑️", isDanger = true }) {
  return new Promise((resolve) => {
    const overlay = document.getElementById("confirmModalOverlay");
    const badge = document.getElementById("confirmModalBadge");
    const iconEl = document.getElementById("confirmModalIcon");
    const titleEl = document.getElementById("confirmModalTitle");
    const messageEl = document.getElementById("confirmModalMessage");
    const btnCancel = document.getElementById("btnConfirmCancel");
    const btnAction = document.getElementById("btnConfirmAction");

    if (!overlay || !btnAction || !btnCancel) {
      resolve(confirm(`${title}\n${message}`));
      return;
    }

    if (iconEl) iconEl.textContent = icon;
    if (titleEl) titleEl.textContent = title;
    if (messageEl) messageEl.textContent = message;
    if (btnCancel) btnCancel.textContent = cancelText;

    if (btnAction) {
      btnAction.textContent = confirmText;
      if (isDanger) {
        btnAction.className = "confirm-btn-action";
        if (badge) badge.className = "confirm-modal-badge";
      } else {
        btnAction.className = "confirm-btn-action is-warning";
        if (badge) badge.className = "confirm-modal-badge is-warning";
      }
    }

    overlay.style.setProperty("display", "flex", "important");

    const cleanup = () => {
      overlay.style.setProperty("display", "none", "important");
      btnAction.onclick = null;
      btnCancel.onclick = null;
      overlay.onclick = null;
    };

    btnAction.onclick = () => {
      cleanup();
      resolve(true);
    };

    btnCancel.onclick = () => {
      cleanup();
      resolve(false);
    };

    overlay.onclick = (e) => {
      if (e.target === overlay) {
        cleanup();
        resolve(false);
      }
    };
  });
}

function openClassManagementDrawer(dayIdx) {
  const drawer = document.getElementById("classManagementDrawer");
  const overlay = document.getElementById("classDrawerOverlay");
  if (!drawer || !overlay) return;

  if (dayIdx !== undefined && dayIdx !== null && dayIdx >= 0 && dayIdx < state.schedule.length) {
    activeClassDrawerDayIndex = dayIdx;
  } else if (state.selectedCardIndex !== null && state.selectedCardIndex < state.schedule.length) {
    activeClassDrawerDayIndex = state.selectedCardIndex;
  } else {
    activeClassDrawerDayIndex = 0;
  }

  drawer.classList.add("is-open");
  overlay.classList.add("is-open");
  overlay.style.display = "block";

  renderClassManagementDrawer();
}

function closeClassManagementDrawer() {
  const drawer = document.getElementById("classManagementDrawer");
  const overlay = document.getElementById("classDrawerOverlay");
  if (drawer) drawer.classList.remove("is-open");
  if (overlay) {
    overlay.classList.remove("is-open");
    setTimeout(() => { overlay.style.display = "none"; }, 250);
  }
}

function renderClassManagementDrawer() {
  const dayTabs = document.getElementById("classDayTabs");
  const drawerBody = document.getElementById("classDrawerBody");
  const drawerSubTitle = document.getElementById("classDrawerSubTitle");

  if (!dayTabs || !drawerBody) return;

  const dayAbbrMap = {
    "Senin": "Sen", "Selasa": "Sel", "Rabu": "Rab", "Kamis": "Kam",
    "Jumat": "Jum", "Sabtu": "Sab", "Minggu": "Min"
  };

  // 1. Render Compact 7-Column Day Tabs (No Scroll)
  dayTabs.innerHTML = "";
  state.schedule.forEach((dayData, idx) => {
    const tabBtn = document.createElement("button");
    tabBtn.type = "button";
    tabBtn.className = `class-day-tab-btn ${idx === activeClassDrawerDayIndex ? 'active' : ''}`;
    const shortDay = dayAbbrMap[dayData.day] || dayData.day.substring(0, 3);
    tabBtn.innerHTML = `
      <span class="day-tab-name">${shortDay}</span>
      <span class="class-day-tab-count">${dayData.events ? dayData.events.length : 0}</span>
    `;
    tabBtn.addEventListener("click", () => {
      activeClassDrawerDayIndex = idx;
      renderClassManagementDrawer();
    });
    dayTabs.appendChild(tabBtn);
  });

  const activeDay = state.schedule[activeClassDrawerDayIndex];
  if (!activeDay) {
    drawerBody.innerHTML = `<div style="text-align: center; color: #94a3b8; padding: 20px;">Tidak ada hari dipilih</div>`;
    return;
  }

  if (drawerSubTitle) {
    drawerSubTitle.textContent = `${activeDay.day.toUpperCase()} • ${(activeDay.events || []).length} Mata Kuliah Terjadwal`;
  }

  // 2. Render Classes for Active Day
  drawerBody.innerHTML = "";

  if (!activeDay.events || activeDay.events.length === 0) {
    drawerBody.innerHTML = `
      <div style="text-align: center; color: #94a3b8; padding: 40px 20px; background: rgba(255,255,255,0.02); border-radius: 12px; border: 1px dashed rgba(255,255,255,0.08);">
        <strong style="color: #f1f5f9; display: block; margin-bottom: 4px;">Belum Ada Mata Kuliah</strong>
        <p style="font-size: 11px; margin: 0;">Klik tombol "+ Tambah Mata Kuliah Baru" di bawah untuk menambahkan jadwal hari ${activeDay.day}.</p>
      </div>
    `;
  } else {
    activeDay.events.forEach((evt, evtIdx) => {
      const card = document.createElement("div");
      card.className = "class-item-card";
      card.innerHTML = `
        <div class="class-item-header">
          <span class="class-number-badge">MATA KULIAH #${evtIdx + 1}</span>
          <button type="button" class="btn-delete-class-item" title="Hapus Kelas Ini">✕ Hapus</button>
        </div>
        <div class="class-form-group">
          <input type="text" class="class-input-field drawer-input-subject" value="${evt.subject || ''}" placeholder="Nama Mata Kuliah / Subjek" data-evt="${evtIdx}" data-field="subject">
          <div class="class-form-row">
            <input type="text" class="class-input-field drawer-input-time" value="${evt.time || ''}" placeholder="Jam (08:00 - 10:30)" data-evt="${evtIdx}" data-field="time">
            <input type="text" class="class-input-field drawer-input-room" value="${evt.room || ''}" placeholder="Ruangan / Lab" data-evt="${evtIdx}" data-field="room">
          </div>
          <input type="text" class="class-input-field drawer-input-note" value="${evt.note || ''}" placeholder="Catatan Tambahan (opsional)" data-evt="${evtIdx}" data-field="note">
        </div>
      `;

      // Attach Delete Event
      card.querySelector(".btn-delete-class-item").addEventListener("click", () => {
        activeDay.events.splice(evtIdx, 1);
        renderScheduleCanvas();
        renderClassManagementDrawer();
        renderSidebarEditor();
        saveStateToHistory();
      });

      // Attach Input Event listeners
      card.querySelectorAll(".class-input-field").forEach(input => {
        input.addEventListener("input", (e) => {
          const field = e.target.dataset.field;
          const eIdx = parseInt(e.target.dataset.evt);
          activeDay.events[eIdx][field] = e.target.value;
          renderScheduleCanvas();
        });
      });

      drawerBody.appendChild(card);
    });
  }

  // 3. Bind Footer Buttons (Add Class, Add Day, Delete Current Day)
  const btnAddClass = document.getElementById("btnDrawerAddClass");
  const btnAddDay = document.getElementById("btnDrawerAddDay");
  const btnDeleteDay = document.getElementById("btnDrawerDeleteDay");
  const btnClose = document.getElementById("btnCloseClassDrawer");

  if (btnClose) {
    btnClose.onclick = closeClassManagementDrawer;
  }

  if (btnDeleteDay) {
    btnDeleteDay.disabled = state.schedule.length <= 1;
    btnDeleteDay.title = state.schedule.length <= 1 ? "Minimal harus ada 1 hari" : `Hapus Hari ${activeDay.day}`;
    btnDeleteDay.onclick = async () => {
      if (state.schedule.length <= 1) return;
      const dayName = activeDay ? activeDay.day.toUpperCase() : "INI";
      const ok = await showConfirmModal({
        title: `Hapus Hari ${dayName}?`,
        message: `Seluruh jadwal & mata kuliah pada hari ${dayName} akan dihapus dari papan.`,
        confirmText: "Ya, Hapus Hari",
        cancelText: "Batal",
        icon: "🗑️",
        isDanger: true
      });
      if (ok) {
        state.schedule.splice(activeClassDrawerDayIndex, 1);
        activeClassDrawerDayIndex = Math.max(0, activeClassDrawerDayIndex - 1);
        renderScheduleCanvas();
        renderClassManagementDrawer();
        renderSidebarEditor();
        saveStateToHistory();
      }
    };
  }

  if (btnAddClass) {
    btnAddClass.onclick = () => {
      if (!activeDay.events) activeDay.events = [];
      activeDay.events.push({
        id: "e" + Date.now(),
        time: "09:00 - 11:30",
        subject: "Mata Kuliah Baru",
        room: "R. 101",
        note: "Catatan penting"
      });
      renderScheduleCanvas();
      renderClassManagementDrawer();
      renderSidebarEditor();
      saveStateToHistory();
    };
  }

  if (btnAddDay) {
    btnAddDay.onclick = () => {
      addNewScheduleDay();
      activeClassDrawerDayIndex = state.schedule.length - 1;
      renderClassManagementDrawer();
      saveStateToHistory();
    };
  }
}

// Render Clean Sidebar Editor Summary Box
function renderSidebarEditor() {
  if (!scheduleEditorList) return;
  scheduleEditorList.innerHTML = `
    <div class="class-summary-box">
      <div class="summary-info">
        <div>
          <strong>Manajemen Kelas (${state.schedule ? state.schedule.length : 0} Hari)</strong>
          <p>Kelola jadwal, jam, & ruangan di panel khusus (Side Drawer)</p>
        </div>
      </div>
      <button type="button" class="btn-open-class-panel" id="btnOpenClassDrawerFromSidebar">
        Edit Kelas & Mata Kuliah ➔
      </button>
    </div>
  `;

  document.getElementById("btnOpenClassDrawerFromSidebar")?.addEventListener("click", () => {
    openClassManagementDrawer(0);
  });
}

function addNewScheduleDay() {
  const days = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu", "Minggu"];
  const currentCount = state.schedule.length;
  const nextDayName = days[currentCount % days.length];
  const colorList = ["butter", "matcha", "peach", "lavender", "sky", "kraft"];
  const randomColor = colorList[currentCount % colorList.length];

  state.schedule.push({
    id: Date.now(),
    day: nextDayName,
    color: randomColor,
    rotate: (Math.random() * 2 - 1).toFixed(1) + "deg",
    accent: "accent-matcha",
    offsetX: 0,
    offsetY: 0,
    events: [
      { id: "e" + Date.now(), time: "09:00 - 11:30", subject: "Agenda Baru", room: "Ruang Pertemuan", note: "Bawa catatan" }
    ]
  });

  renderScheduleCanvas();
  renderSidebarEditor();
}

// ============================================================
// GLOBAL FLOATING CARD TOOLBAR
// Uses position:fixed so it escapes all overflow:hidden parents
// ============================================================
let _gtbActiveIndex = null;
let _gtbRafId = null;

function showGlobalToolbar(cardEl, dayIdx) {
  if (!globalCardToolbar) return;
  _gtbActiveIndex = dayIdx;

  // Update button states for this card
  const dayData = state.schedule[dayIdx];
  if (dayData) {
    const pinBtn = document.getElementById("gtbTogglePin");
    const clipBtn = document.getElementById("gtbToggleClip");
    const tapeBtn = document.getElementById("gtbToggleTape");
    
    const isClipActive = (dayData.hasClip === true);
    const isPinActive = (dayData.hasPin !== false) && !isClipActive;
    const isTapeActive = (dayData.hasTape !== false);

    if (pinBtn) pinBtn.classList.toggle("active-dec-btn", isPinActive);
    if (clipBtn) clipBtn.classList.toggle("active-dec-btn", isClipActive);
    if (tapeBtn) tapeBtn.classList.toggle("active-dec-btn", isTapeActive);
  }

  globalCardToolbar.classList.remove("hidden");
  globalCardToolbar.style.setProperty("display", "flex", "important");
  positionGlobalToolbar(cardEl);
}

function positionGlobalToolbar(cardEl) {
  if (!globalCardToolbar || !cardEl) return;

  requestAnimationFrame(() => {
    const rect = cardEl.getBoundingClientRect();
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const tbW = globalCardToolbar.offsetWidth || 260;
    const tbH = globalCardToolbar.offsetHeight || 36;

    // Detect top header & typography ribbon clearance bounds
    const previewHeader = document.getElementById("previewToolbar");
    const typoRibbon = document.getElementById("canvaTypographyRibbon");

    let minTopAllowed = 12;
    if (previewHeader) {
      const hRect = previewHeader.getBoundingClientRect();
      if (hRect.bottom > 0) minTopAllowed = Math.max(minTopAllowed, hRect.bottom + 8);
    }
    if (typoRibbon && typoRibbon.classList.contains("is-open")) {
      const rRect = typoRibbon.getBoundingClientRect();
      if (rRect.bottom > 0) minTopAllowed = Math.max(minTopAllowed, rRect.bottom + 8);
    }

    // Default: position above card. If top is above minTopAllowed, flip below card!
    let top = rect.top - tbH - 8;
    if (top < minTopAllowed) {
      top = rect.bottom + 8;
    }

    // Clamp top to stay within viewport bottom
    if (top + tbH > vh - 12) {
      top = Math.max(minTopAllowed, vh - tbH - 12);
    }

    // Center horizontally on card, clamp strictly inside screen bounds
    const sideMargin = 10;
    let left = rect.left + (rect.width / 2) - (tbW / 2);
    left = Math.max(sideMargin, Math.min(vw - tbW - sideMargin, left));

    globalCardToolbar.style.position = "fixed";
    globalCardToolbar.style.zIndex = "999999";
    globalCardToolbar.style.top = top + "px";
    globalCardToolbar.style.left = left + "px";
    globalCardToolbar.style.right = "auto";
  });
}

function hideGlobalToolbar() {
  if (!globalCardToolbar) return;
  globalCardToolbar.classList.add("hidden");
  globalCardToolbar.style.setProperty("display", "none", "important");
  _gtbActiveIndex = null;
}

function deselectAllCardsAndHideToolbar() {
  state.selectedCardIndex = null;
  document.querySelectorAll(".sticky-note-card").forEach(c => c.classList.remove("canva-selected-card"));
  hideGlobalToolbar();
}

function setupGlobalToolbar() {
  if (!globalCardToolbar) return;

  // Re-position on scroll/resize
  window.addEventListener("resize", () => {
    if (_gtbActiveIndex !== null) {
      const selectedCard = bentoBoard.querySelector(".canva-selected-card");
      if (selectedCard) positionGlobalToolbar(selectedCard);
    }
  });

  // + Matkul (Opens Dedicated Class Management Side Drawer for active day)
  document.getElementById("gtbAddEvent")?.addEventListener("click", (e) => {
    e.stopPropagation();
    const activeIdx = _gtbActiveIndex !== null ? _gtbActiveIndex : 0;
    openClassManagementDrawer(activeIdx);
  });

  // Color swatches in global toolbar
  globalCardToolbar.querySelectorAll(".canva-swatch").forEach(swatch => {
    swatch.addEventListener("click", (e) => {
      e.stopPropagation();
      if (_gtbActiveIndex === null) return;
      const color = swatch.dataset.color;
      state.schedule[_gtbActiveIndex].color = color;
      delete state.schedule[_gtbActiveIndex].customBgColor;
      renderScheduleCanvas(); renderSidebarEditor(); saveStateToHistory();
    });
  });

  // Color wheel
  document.getElementById("gtbColorWheel")?.addEventListener("click", (e) => {
    e.stopPropagation();
    if (_gtbActiveIndex === null) return;
    const currentColor = state.schedule[_gtbActiveIndex].customBgColor || "#fff9db";
    openAestheticColorModal("card", _gtbActiveIndex, currentColor);
  });

  // Toggle Pin (Mutually Exclusive with Paperclip)
  document.getElementById("gtbTogglePin")?.addEventListener("click", (e) => {
    e.stopPropagation();
    if (_gtbActiveIndex === null) return;
    const d = state.schedule[_gtbActiveIndex];
    if (d.hasPin && !d.hasClip) {
      d.hasPin = false;
      d.hasClip = false;
    } else {
      d.hasPin = true;
      d.hasClip = false;
    }
    const selectedCard = bentoBoard.querySelector(".canva-selected-card");
    if (selectedCard) showGlobalToolbar(selectedCard, _gtbActiveIndex);
    renderScheduleCanvas(); saveStateToHistory();
  });

  // Toggle Clip (Mutually Exclusive with Push Pin)
  document.getElementById("gtbToggleClip")?.addEventListener("click", (e) => {
    e.stopPropagation();
    if (_gtbActiveIndex === null) return;
    const d = state.schedule[_gtbActiveIndex];
    if (d.hasClip) {
      d.hasClip = false;
      d.hasPin = false;
    } else {
      d.hasClip = true;
      d.hasPin = false;
    }
    const selectedCard = bentoBoard.querySelector(".canva-selected-card");
    if (selectedCard) showGlobalToolbar(selectedCard, _gtbActiveIndex);
    renderScheduleCanvas(); saveStateToHistory();
  });

  // Toggle Tape
  document.getElementById("gtbToggleTape")?.addEventListener("click", (e) => {
    e.stopPropagation();
    if (_gtbActiveIndex === null) return;
    const d = state.schedule[_gtbActiveIndex];
    d.hasTape = (d.hasTape === false) ? true : false;
    e.currentTarget.classList.toggle("active-dec-btn", d.hasTape !== false);
    renderScheduleCanvas(); saveStateToHistory();
  });

  // Rotate Left
  document.getElementById("gtbRotateLeft")?.addEventListener("click", (e) => {
    e.stopPropagation();
    if (_gtbActiveIndex === null) return;
    const cur = parseFloat(state.schedule[_gtbActiveIndex].rotate || 0);
    state.schedule[_gtbActiveIndex].rotate = `${(cur - 1).toFixed(1)}deg`;
    renderScheduleCanvas(); renderSidebarEditor(); updateCoordinateHud(); saveStateToHistory();
  });

  // Rotate Right
  document.getElementById("gtbRotateRight")?.addEventListener("click", (e) => {
    e.stopPropagation();
    if (_gtbActiveIndex === null) return;
    const cur = parseFloat(state.schedule[_gtbActiveIndex].rotate || 0);
    state.schedule[_gtbActiveIndex].rotate = `${(cur + 1).toFixed(1)}deg`;
    renderScheduleCanvas(); renderSidebarEditor(); updateCoordinateHud(); saveStateToHistory();
  });

  // Delete Day
  document.getElementById("gtbDelete")?.addEventListener("click", async (e) => {
    e.stopPropagation();
    if (_gtbActiveIndex === null) return;
    if (state.schedule.length <= 1) return;

    const dayData = state.schedule[_gtbActiveIndex];
    const dayName = dayData ? dayData.day.toUpperCase() : "INI";

    const ok = await showConfirmModal({
      title: `Hapus Hari ${dayName}?`,
      message: `Seluruh jadwal & mata kuliah pada hari ${dayName} akan dihapus dari papan.`,
      confirmText: "Ya, Hapus Hari",
      cancelText: "Batal",
      icon: "🗑️",
      isDanger: true
    });

    if (ok) {
      state.schedule.splice(_gtbActiveIndex, 1);
      hideGlobalToolbar();
      renderScheduleCanvas(); renderSidebarEditor(); saveStateToHistory();
    }
  });

  // Failsafe: Hide toolbar & deselect cards whenever clicking ANYWHERE outside sticky notes and quicktool
  window.addEventListener("pointerdown", (e) => {
    if (e.target.closest("#globalCardToolbar")) return;
    if (e.target.closest(".sticky-note-card")) return;

    deselectAllCardsAndHideToolbar();
  }, true);

  window.addEventListener("click", (e) => {
    if (e.target.closest("#globalCardToolbar")) return;
    if (e.target.closest(".sticky-note-card")) return;

    deselectAllCardsAndHideToolbar();
  }, true);
}


function adjustZoom(delta) {
  state.zoom = Math.max(40, Math.min(150, state.zoom + delta));
  const zoomLevelText = document.getElementById("zoomLevelText");
  if (zoomLevelText) zoomLevelText.textContent = state.zoom + "%";

  const canvasStageWrapper = document.getElementById("canvasStageWrapper");
  if (canvasStageWrapper) {
    canvasStageWrapper.style.transform = `scale(${state.zoom / 100})`;
    canvasStageWrapper.style.transformOrigin = "center center";
  } else {
    scheduleCanvas.style.transform = `scale(${state.zoom / 100})`;
    scheduleCanvas.style.transformOrigin = "center center";
  }
}

// Export High-Resolution PNG Wallpaper
async function exportHighResWallpaper() {
  const exportBtn = document.getElementById("btnExportImage");
  const quickExportBtn = document.getElementById("btnQuickExport");
  
  const originalText = exportBtn ? exportBtn.innerHTML : "Export";
  if (exportBtn) {
    exportBtn.innerHTML = "Generating HD Wallpaper...";
    exportBtn.disabled = true;
  }
  if (quickExportBtn) {
    quickExportBtn.disabled = true;
  }

  try {
    // Hide all Canva toolbars & outline rings before capture
    scheduleCanvas.classList.add("is-exporting");
    const canvasStageWrapper = document.getElementById("canvasStageWrapper");
    let currentTransform = "";
    if (canvasStageWrapper) {
      currentTransform = canvasStageWrapper.style.transform;
      canvasStageWrapper.style.transform = "none";
    }

    const canvas = await html2canvas(scheduleCanvas, {
      scale: 3, // 3x sharp retina scale for wallpaper
      useCORS: true,
      backgroundColor: null,
      logging: false
    });

    if (canvasStageWrapper) {
      canvasStageWrapper.style.transform = currentTransform;
    }
    scheduleCanvas.classList.remove("is-exporting");

    const image = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.download = `Jadwalku-${state.ratio}-wallpaper.png`;
    link.href = image;
    link.click();
  } catch (err) {
    console.error("Export error:", err);
    alert("Gagal mengexport wallpaper. Silakan coba lagi.");
  } finally {
    scheduleCanvas.classList.remove("is-exporting");
    if (exportBtn) {
      exportBtn.innerHTML = originalText;
      exportBtn.disabled = false;
    }
    if (quickExportBtn) {
      quickExportBtn.disabled = false;
    }
  }
}

// ==========================================================================
// CUSTOM JADWALKU AESTHETIC COLOR PICKER MODAL ENGINE
// ==========================================================================
let activeColorTarget = { type: null, dayIdx: null }; // { type: 'card'|'text', dayIdx: number|null }

function openAestheticColorModal(type, dayIdx = null, currentColor = '#fff9db') {
  activeColorTarget = { type, dayIdx };
  const overlay = document.getElementById("canvaColorModalOverlay");
  const title = document.getElementById("canvaColorModalTitle");
  const icon = document.getElementById("canvaColorModalIcon");
  const previewBox = document.getElementById("modalColorPreviewBox");
  const hexInput = document.getElementById("modalHexInput");

  if (type === 'text') {
    if (title) title.textContent = "Pilih Warna Teks";
    if (icon) icon.textContent = "T";
  } else {
    if (title) title.textContent = "Pilih Warna Sticky Note";
    if (icon) icon.textContent = "●";
  }

  if (previewBox) previewBox.style.backgroundColor = currentColor;
  if (hexInput) hexInput.value = currentColor.toUpperCase();

  if (overlay) overlay.style.display = "flex";
  drawSpectrumCanvas(0);
}

function closeAestheticColorModal() {
  const overlay = document.getElementById("canvaColorModalOverlay");
  if (overlay) overlay.style.display = "none";
}

function drawSpectrumCanvas(hue = 0) {
  const canvas = document.getElementById("colorSpectrumCanvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  const width = canvas.width;
  const height = canvas.height;

  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      const sat = Math.round((x / width) * 100);
      const light = Math.round((1 - y / height) * 100);
      ctx.fillStyle = `hsl(${hue}, ${sat}%, ${light}%)`;
      ctx.fillRect(x, y, 1, 1);
    }
  }
}

function updateSpectrumPointer(x, y) {
  const pointer = document.getElementById("spectrumPointer");
  if (pointer) {
    pointer.style.left = `${x}px`;
    pointer.style.top = `${y}px`;
    pointer.style.display = "block";
  }
}

function setupAestheticColorModalListeners() {
  const overlay = document.getElementById("canvaColorModalOverlay");
  const closeBtn = document.getElementById("btnCloseColorModal");
  const applyBtn = document.getElementById("btnApplyModalColor");
  const tabPalettes = document.getElementById("tabBtnPalettes");
  const tabWheel = document.getElementById("tabBtnWheel");
  const tabContentPalettes = document.getElementById("tabPresetPalettes");
  const tabContentWheel = document.getElementById("tabCustomWheel");
  const hueSlider = document.getElementById("hueRangeSlider");
  const canvas = document.getElementById("colorSpectrumCanvas");
  const hexInput = document.getElementById("modalHexInput");
  const previewBox = document.getElementById("modalColorPreviewBox");

  if (closeBtn) closeBtn.addEventListener("click", closeAestheticColorModal);
  if (overlay) {
    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) closeAestheticColorModal();
    });
  }

  if (tabPalettes && tabWheel) {
    tabPalettes.addEventListener("click", () => {
      tabPalettes.classList.add("active");
      tabWheel.classList.remove("active");
      if (tabContentPalettes) tabContentPalettes.style.display = "block";
      if (tabContentWheel) tabContentWheel.style.display = "none";
    });

    tabWheel.addEventListener("click", () => {
      tabWheel.classList.add("active");
      tabPalettes.classList.remove("active");
      if (tabContentWheel) tabContentWheel.style.display = "block";
      if (tabContentPalettes) tabContentPalettes.style.display = "none";
      drawSpectrumCanvas(hueSlider ? parseInt(hueSlider.value) : 0);
    });
  }

  if (hueSlider) {
    hueSlider.addEventListener("input", () => {
      drawSpectrumCanvas(parseInt(hueSlider.value));
    });
  }

  if (canvas) {
    let isSpectrumDragging = false;

    const pickColorAtClientPos = (clientX, clientY) => {
      const rect = canvas.getBoundingClientRect();
      const x = Math.max(0, Math.min(canvas.width, (clientX - rect.left) * (canvas.width / rect.width)));
      const y = Math.max(0, Math.min(canvas.height, (clientY - rect.top) * (canvas.height / rect.height)));
      
      const ctx = canvas.getContext("2d");
      const imgData = ctx.getImageData(Math.floor(x), Math.floor(y), 1, 1).data;
      const hex = "#" + ((1 << 24) + (imgData[0] << 16) + (imgData[1] << 8) + imgData[2]).toString(16).slice(1).toUpperCase();
      
      updateSpectrumPointer(x * (rect.width / canvas.width), y * (rect.height / canvas.height));
      
      if (hexInput) hexInput.value = hex;
      if (previewBox) previewBox.style.backgroundColor = hex;
    };

    canvas.addEventListener("pointerdown", (e) => {
      isSpectrumDragging = true;
      pickColorAtClientPos(e.clientX, e.clientY);
      try { canvas.setPointerCapture(e.pointerId); } catch (err) {}
    });

    canvas.addEventListener("pointermove", (e) => {
      if (!isSpectrumDragging) return;
      pickColorAtClientPos(e.clientX, e.clientY);
    });

    canvas.addEventListener("pointerup", (e) => {
      isSpectrumDragging = false;
      try { canvas.releasePointerCapture(e.pointerId); } catch (err) {}
    });
  }

  document.querySelectorAll(".custom-palette-swatch").forEach(swatch => {
    swatch.addEventListener("click", () => {
      const color = swatch.dataset.color;
      if (hexInput) hexInput.value = color.toUpperCase();
      if (previewBox) previewBox.style.backgroundColor = color;
    });
  });

  if (hexInput) {
    hexInput.addEventListener("input", () => {
      const val = hexInput.value.trim();
      if (/^#[0-9A-F]{6}$/i.test(val)) {
        if (previewBox) previewBox.style.backgroundColor = val;
      }
    });
  }

  if (applyBtn) {
    applyBtn.addEventListener("click", () => {
      const chosenColor = hexInput ? hexInput.value.trim() : '#fff9db';
      if (activeColorTarget.type === 'card' && activeColorTarget.dayIdx !== null) {
        state.schedule[activeColorTarget.dayIdx].customBgColor = chosenColor;
        renderScheduleCanvas();
        renderSidebarEditor();
        saveStateToHistory();
      } else if (activeColorTarget.type === 'text') {
        if (state.activeEditableElement) {
          state.activeEditableElement.style.color = chosenColor;
        } else if (state.selectedCardIndex !== null) {
          const card = document.querySelector(`.sticky-note-card[data-index="${state.selectedCardIndex}"]`);
          if (card) {
            card.querySelectorAll(".canva-editable-text, .sticky-day-name, .event-title, .event-time, .event-room-tag, .event-handwritten-note").forEach(el => {
              el.style.color = chosenColor;
            });
          }
        }
        const textColorBar = document.getElementById("textColorBar");
        if (textColorBar) textColorBar.style.backgroundColor = chosenColor;
        saveStateToHistory();
      }
      closeAestheticColorModal();
    });
  }
}

// ==========================================================================
// AI SCHEDULE AUTO-FILL ENGINE (Model: gpt-5.6-luna)
// ==========================================================================

async function getOpenAiApiKey() {
  let key = localStorage.getItem("openai_api_key");
  if (key && key.startsWith("sk-")) return key;

  try {
    const res = await fetch(".env");
    if (res.ok) {
      const text = await res.text();
      const match = text.match(/(?:API|OPENAI_API_KEY)\s*=\s*(["']?)(sk-[^\s"']+)\1/i);
      if (match && match[2]) {
        return match[2];
      }
    }
  } catch (e) {}

  return key || null;
}

// Helper function: Merge consecutive duplicate subject periods on the same day
function mergeConsecutiveEvents(schedule) {
  if (!Array.isArray(schedule)) return schedule;

  return schedule.map(dayObj => {
    if (!dayObj.events || !Array.isArray(dayObj.events) || dayObj.events.length <= 1) {
      return dayObj;
    }

    const mergedEvents = [];
    let current = null;

    dayObj.events.forEach(evt => {
      if (!evt || !evt.subject) return;

      const normSubject = evt.subject.trim().toLowerCase();
      const normRoom = (evt.room || "").trim().toLowerCase();

      if (!current) {
        current = { ...evt };
        return;
      }

      const currSubject = (current.subject || "").trim().toLowerCase();
      const currRoom = (current.room || "").trim().toLowerCase();

      // Merge if same subject and same room
      if (currSubject === normSubject && currRoom === normRoom) {
        const currParts = (current.time || "").split("-").map(s => s.trim());
        const newParts = (evt.time || "").split("-").map(s => s.trim());

        const newStartTime = currParts[0] || "";
        const newEndTime = newParts[1] || newParts[0] || currParts[1] || "";

        if (newStartTime && newEndTime) {
          current.time = `${newStartTime} - ${newEndTime}`;
        }
        if (evt.note && evt.note.trim()) {
          if (!current.note || !current.note.includes(evt.note)) {
            current.note = current.note ? `${current.note}; ${evt.note}` : evt.note;
          }
        }
      } else {
        mergedEvents.push(current);
        current = { ...evt };
      }
    });

    if (current) {
      mergedEvents.push(current);
    }

    return {
      ...dayObj,
      events: mergedEvents
    };
  });
}

let lastAiCallTime = 0;

function setupAiScheduleAutoFill() {
  const btnOpenModal = document.getElementById("btnOpenAiModal");
  const btnCloseModal = document.getElementById("btnCloseAiModal");
  const modalOverlay = document.getElementById("aiModalOverlay");
  const tabBtnText = document.getElementById("tabBtnAiText");
  const tabBtnImage = document.getElementById("tabBtnAiImage");
  const tabContentText = document.getElementById("tabAiText");
  const tabContentImage = document.getElementById("tabAiImage");
  const dropzone = document.getElementById("aiDropzone");
  const fileInput = document.getElementById("aiImageFileInput");
  const imagePreview = document.getElementById("aiImagePreview");
  const dropzoneContent = document.getElementById("dropzoneContent");
  const btnProcess = document.getElementById("btnProcessAiImport");
  const statusRow = document.getElementById("aiStatusRow");
  const statusText = document.getElementById("aiStatusText");
  const textInput = document.getElementById("aiScheduleTextInput");

  let activeTab = "ai-text";
  let selectedImageDataUrl = null;

  if (btnOpenModal) {
    btnOpenModal.addEventListener("click", () => {
      if (modalOverlay) modalOverlay.style.display = "flex";
    });
  }

  if (btnCloseModal) {
    btnCloseModal.addEventListener("click", () => {
      if (modalOverlay) modalOverlay.style.display = "none";
    });
  }

  if (modalOverlay) {
    modalOverlay.addEventListener("click", (e) => {
      if (e.target === modalOverlay) modalOverlay.style.display = "none";
    });
  }

  if (tabBtnText && tabBtnImage) {
    tabBtnText.addEventListener("click", () => {
      activeTab = "ai-text";
      tabBtnText.classList.add("active");
      tabBtnImage.classList.remove("active");
      if (tabContentText) tabContentText.style.display = "block";
      if (tabContentImage) tabContentImage.style.display = "none";
    });

    tabBtnImage.addEventListener("click", () => {
      activeTab = "ai-image";
      tabBtnImage.classList.add("active");
      tabBtnText.classList.remove("active");
      if (tabContentImage) tabContentImage.style.display = "block";
      if (tabContentText) tabContentText.style.display = "none";
    });
  }

  // Image Dropzone Handling
  if (dropzone && fileInput) {
    dropzone.addEventListener("click", () => fileInput.click());

    dropzone.addEventListener("dragover", (e) => {
      e.preventDefault();
      dropzone.classList.add("dragover");
    });

    dropzone.addEventListener("dragleave", () => {
      dropzone.classList.remove("dragover");
    });

    dropzone.addEventListener("drop", (e) => {
      e.preventDefault();
      dropzone.classList.remove("dragover");
      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        handleImageFile(e.dataTransfer.files[0]);
      }
    });

    fileInput.addEventListener("change", (e) => {
      if (e.target.files && e.target.files[0]) {
        handleImageFile(e.target.files[0]);
      }
    });
  }

  function handleImageFile(file) {
    if (!file.type.startsWith("image/")) {
      alert("Harap upload file gambar (PNG/JPG).");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        // Client-side image compression to max 800px width/height for token efficiency
        const maxDim = 800;
        let w = img.width;
        let h = img.height;
        if (w > maxDim || h > maxDim) {
          if (w > h) {
            h = Math.round((h * maxDim) / w);
            w = maxDim;
          } else {
            w = Math.round((w * maxDim) / h);
            h = maxDim;
          }
        }
        const canvas = document.createElement("canvas");
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, w, h);
        selectedImageDataUrl = canvas.toDataURL("image/jpeg", 0.75);

        if (imagePreview) {
          imagePreview.src = selectedImageDataUrl;
          imagePreview.style.display = "block";
        }
        if (dropzoneContent) {
          dropzoneContent.style.display = "none";
        }
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  }

  // Process AI Auto-Fill via OpenAI API (Model: gpt-5.6-luna)
  if (btnProcess) {
    btnProcess.addEventListener("click", async () => {
      // Rate Limit Cooldown Check (Anti-Spam)
      const now = Date.now();
      if (now - lastAiCallTime < 10000) {
        const waitSec = Math.ceil((10000 - (now - lastAiCallTime)) / 1000);
        alert(`Harap tunggu ${waitSec} detik sebelum melakukan request AI berikutnya.`);
        return;
      }

      const apiKey = await getOpenAiApiKey();
      if (!apiKey) {
        const inputKey = prompt("OpenAI API Key tidak ditemukan. Masukkan API Key OpenAI Anda (sk-...):");
        if (!inputKey || !inputKey.trim()) return;
        localStorage.setItem("openai_api_key", inputKey.trim());
      }

      const activeApiKey = await getOpenAiApiKey();
      if (!activeApiKey) return;

      let userMessageContent = "";
      if (activeTab === "ai-text") {
        const rawText = textInput ? textInput.value.trim() : "";
        if (!rawText || rawText.length < 5) {
          alert("Harap masukkan teks jadwal yang valid (minimal 5 karakter)!");
          return;
        }
        userMessageContent = `Extract class schedule from this text:\n\n${rawText}`;
      } else {
        if (!selectedImageDataUrl) {
          alert("Harap upload foto jadwal terlebih dahulu!");
          return;
        }
        userMessageContent = [
          { type: "text", text: "Extract class schedule from this schedule image into JSON format." },
          {
            type: "image_url",
            image_url: {
              url: selectedImageDataUrl,
              detail: "low" // LOW DETAIL FOR MINIMUM TOKEN CONSUMPTION & COST SAVING
            }
          }
        ];
      }

      lastAiCallTime = Date.now();

      if (statusRow) statusRow.style.display = "flex";
      if (statusText) statusText.textContent = "Sedang memproses & memverifikasi jadwal...";
      btnProcess.disabled = true;

      const systemPrompt = `You are an expert aesthetic Class Schedule Extraction AI for a Studygram aesthetic app.
STRICT SECURITY & DOMAIN ENFORCEMENT:
1. YOUR ONLY DOMAIN IS CLASS / COLLEGE / SCHOOL / TIMETABLE SCHEDULES.
2. IF THE INPUT IS NOT A SCHOOL, COLLEGE, OR LESSON SCHEDULE:
   You MUST return EXACTLY: {"error": "INVALID_DOMAIN", "message": "Input ditolak: Harap upload foto atau masukkan teks jadwal pelajaran / kuliah yang valid."}

3. EXTRACTION & AESTHETIC ENHANCEMENT RULES:
   - CONSECUTIVE SUBJECT MERGING: Always merge consecutive identical subjects on the same day into a single time span (e.g., Jam ke-1 B. JAWA and Jam ke-2 B. JAWA -> "Jam ke-1 - Jam ke-2" B. JAWA).
   - ROOM HANDLING: If room/location is in the source (e.g. "R. 201", "Lab Komp", "Studio A"), extract it. If NO room is mentioned, leave "room" as an empty string "". NEVER put "-" or "undefined".
   - AESTHETIC NOTES GENERATION ("LEGA & DETAIL"): Always generate a concise, aesthetic 3-6 word Indonesian study reminder/note for each subject if not explicitly specified in input (e.g. "Bawa buku & catat poin penting", "Praktikum & latihan koding", "Diskusi kelompok & tugas", "Materi & kuis harian", "Ringkasan & persiapan"). NEVER leave "note" empty unless it is Upacara/Break! This ensures cards look detailed, rich, and studygram-aesthetic.

4. JSON SCHEMA REQUIREMENT:
Output ONLY raw valid JSON array:
[
  {
    "id": 1,
    "day": "Senin",
    "color": "butter",
    "rotate": "-1deg",
    "accent": "accent-matcha",
    "offsetX": 0,
    "offsetY": 0,
    "events": [
      {
        "id": "e1",
        "time": "08:00 - 09:30",
        "subject": "Pemrograman Web",
        "room": "Lab Komp 3",
        "note": "Praktikum & latihan koding"
      }
    ]
  }
]
- Valid days in Indonesian: "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu", "Minggu".
- Valid colors: "butter", "matcha", "peach", "lavender", "sky", "kraft".
- Output raw JSON array ONLY, no markdown wrappers.`;

      try {
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${activeApiKey}`
          },
          body: JSON.stringify({
            model: "gpt-5.6-luna",
            messages: [
              { role: "system", content: systemPrompt },
              { role: "user", content: userMessageContent }
            ]
          })
        });

        if (!response.ok) {
          const errData = await response.json().catch(() => ({}));
          throw new Error(errData.error?.message || `HTTP ${response.status} Error`);
        }

        const data = await response.json();
        let aiContent = data.choices[0]?.message?.content || "";
        aiContent = aiContent.replace(/```json/g, "").replace(/```/g, "").trim();

        let parsedSchedule = JSON.parse(aiContent);

        // Check Domain Rejection from AI System Prompt
        if (parsedSchedule.error === "INVALID_DOMAIN" || (parsedSchedule.error && parsedSchedule.message)) {
          throw new Error(parsedSchedule.message || "Input ditolak: Harap upload foto atau masukkan teks jadwal pelajaran / kuliah yang valid.");
        }

        if (!Array.isArray(parsedSchedule)) {
          if (parsedSchedule.schedule && Array.isArray(parsedSchedule.schedule)) {
            parsedSchedule = parsedSchedule.schedule;
          } else {
            throw new Error("Input bukan merupakan jadwal pelajaran / kuliah yang valid.");
          }
        }

        // Apply automatic post-processing event merger!
        const mergedSchedule = mergeConsecutiveEvents(parsedSchedule);

        // Apply new schedule to state!
        state.schedule = mergedSchedule;
        renderScheduleCanvas();
        renderSidebarEditor();
        saveStateToHistory();

        if (statusText) statusText.textContent = "✅ Sukses! Jadwal berhasil diisi & digabung secara otomatis.";
        setTimeout(() => {
          if (modalOverlay) modalOverlay.style.display = "none";
          if (statusRow) statusRow.style.display = "none";
        }, 1200);

      } catch (err) {
        console.error("AI Import Error:", err);
        alert(`Gagal memproses AI Auto-Fill:\n${err.message}`);
        if (statusRow) statusRow.style.display = "none";
      } finally {
        btnProcess.disabled = false;
      }
    });
  }
}

// ==========================================================================
// CANVA DECORATOR ELEMENTS (HEADER BANNER, GOALS NOTE, BARCODE, QUOTE)
// ==========================================================================

function attachDecoratorPointerDrag(el, decKey) {
  if (!el) return;
  let isPointerDown = false;
  let isDragging = false;
  let startX = 0;
  let startY = 0;
  let initX = 0;
  let initY = 0;

  el.addEventListener("pointerdown", (e) => {
    if (state.isPanMode) return;
    if (e.button !== 0 && e.pointerType === "mouse") return;
    if (e.target.closest(".canva-decorator-toolbar") || e.target.isContentEditable || e.target.closest("button")) {
      return;
    }

    // Select decorator element
    document.querySelectorAll(".canva-selected-decorator, .canva-selected-card").forEach(c => {
      c.classList.remove("canva-selected-decorator");
      c.classList.remove("canva-selected-card");
    });
    hideGlobalToolbar();
    state.selectedCardIndex = null;
    el.classList.add("canva-selected-decorator");
    state.selectedDecoratorKey = decKey;

    isPointerDown = true;
    isDragging = false;
    startX = e.clientX;
    startY = e.clientY;

    if (!state.decorators) state.decorators = {};
    if (!state.decorators[decKey]) {
      state.decorators[decKey] = { visible: true, offsetX: 0, offsetY: 0, rotate: 0 };
    }

    initX = state.decorators[decKey].offsetX || 0;
    initY = state.decorators[decKey].offsetY || 0;

    try {
      el.setPointerCapture(e.pointerId);
    } catch (err) {}
  });

  el.addEventListener("pointermove", (e) => {
    if (!isPointerDown) return;
    const dx = (e.clientX - startX) / ((state.zoom || 70) / 100);
    const dy = (e.clientY - startY) / ((state.zoom || 70) / 100);

    if (Math.abs(dx) > 2 || Math.abs(dy) > 2) {
      isDragging = true;
    }

    if (isDragging) {
      state.decorators[decKey].offsetX = initX + dx;
      state.decorators[decKey].offsetY = initY + dy;

      const rot = state.decorators[decKey].rotate || 0;
      el.style.transform = `translate3d(${state.decorators[decKey].offsetX}px, ${state.decorators[decKey].offsetY}px, 0) rotate(${rot}deg)`;
    }
  });

  const stopDrag = (e) => {
    if (!isPointerDown) return;
    isPointerDown = false;
    if (isDragging) {
      isDragging = false;
      saveStateToHistory();
    }
    try {
      el.releasePointerCapture(e.pointerId);
    } catch (err) {}
  };

  el.addEventListener("pointerup", stopDrag);
  el.addEventListener("pointercancel", stopDrag);
}

function setupVisualDecoratorCard(cardId, badgeId, stateKey, hideCssClass, isInvertedClass = false) {
  const card = document.getElementById(cardId);
  const badge = document.getElementById(badgeId);
  if (!card) return;

  const updateUI = () => {
    const isON = state.toggles[stateKey] !== false;
    if (isON) {
      card.classList.add("active");
      if (badge) badge.textContent = "ON";
      if (isInvertedClass) {
        scheduleCanvas.classList.add(hideCssClass);
      } else {
        scheduleCanvas.classList.remove(hideCssClass);
      }
    } else {
      card.classList.remove("active");
      if (badge) badge.textContent = "OFF";
      if (isInvertedClass) {
        scheduleCanvas.classList.remove(hideCssClass);
      } else {
        scheduleCanvas.classList.add(hideCssClass);
      }
    }
  };

  card.addEventListener("click", () => {
    const banner = document.getElementById("fastenerGuideBanner");
    const guideText = document.getElementById("fastenerGuideText");

    // If user has a card selected on canvas, target that card specifically first
    if (state.selectedCardIndex !== null && state.schedule[state.selectedCardIndex]) {
      const selectedDay = state.schedule[state.selectedCardIndex];
      if (stateKey === "pushPin") {
        if (selectedDay.hasPin && !selectedDay.hasClip) {
          selectedDay.hasPin = false;
          selectedDay.hasClip = false;
        } else {
          selectedDay.hasPin = true;
          selectedDay.hasClip = false;
        }
      } else if (stateKey === "paperclip") {
        if (selectedDay.hasClip) {
          selectedDay.hasClip = false;
          selectedDay.hasPin = false;
        } else {
          selectedDay.hasClip = true;
          selectedDay.hasPin = false;
        }
      } else if (stateKey === "washiTape") {
        selectedDay.hasTape = (selectedDay.hasTape === false) ? true : false;
      } else if (stateKey === "frostedCards") {
        state.toggles.frostedCards = !state.toggles.frostedCards;
      }
      
      renderScheduleCanvas();
      
      // Highlight targeted card on canvas
      const targetCard = bentoBoard.children[state.selectedCardIndex];
      if (targetCard) {
        targetCard.classList.remove("card-highlight-pulse");
        void targetCard.offsetWidth; // trigger reflow
        targetCard.classList.add("card-highlight-pulse");
      }
    } else {
      // If no card is selected, enter interactive fastener target mode or global toggle
      if (stateKey === "pushPin") {
        if (state.pendingFastenerMode === "pin") {
          state.pendingFastenerMode = null;
          if (banner) banner.style.display = "none";
        } else {
          state.pendingFastenerMode = "pin";
          if (guideText) guideText.textContent = "📍 Klik note hari mana yang ingin Anda pasang Push Pin";
          if (banner) banner.style.display = "flex";
        }
      } else if (stateKey === "paperclip") {
        if (state.pendingFastenerMode === "clip") {
          state.pendingFastenerMode = null;
          if (banner) banner.style.display = "none";
        } else {
          state.pendingFastenerMode = "clip";
          if (guideText) guideText.textContent = "📎 Klik note hari mana yang ingin Anda pasang Paperclip";
          if (banner) banner.style.display = "flex";
        }
      } else {
        // Global Toggle for Washi Tape & Frosted Glass
        state.toggles[stateKey] = !state.toggles[stateKey];
      }
    }

    updateUI();
    saveStateToHistory();
  });

  updateUI();
}

function initDecoratorElements() {
  setupVisualDecoratorCard("btnVisualWashiTape", "badgeWashiTape", "washiTape", "hide-washi-tape");
  setupVisualDecoratorCard("btnVisualPushPin", "badgePushPin", "pushPin", "hide-push-pins");
  setupVisualDecoratorCard("btnVisualPaperclip", "badgePaperclip", "paperclip", "hide-paperclips");
  setupVisualDecoratorCard("btnVisualFrosted", "badgeFrosted", "frostedCards", "card-glass-frosted", true);

  const decMap = {
    headerStamp: "decoratorHeaderStamp",
    headerGoals: "decoratorHeaderGoals",
    footerBarcode: "decoratorFooterBarcode",
    footerQuote: "decoratorFooterQuote"
  };

  if (!state.decorators) {
    state.decorators = {
      headerStamp: { visible: true, offsetX: 0, offsetY: 0, rotate: 0 },
      headerGoals: { visible: true, offsetX: 0, offsetY: 0, rotate: -1, color: "butter" },
      footerBarcode: { visible: true, offsetX: 0, offsetY: 0, rotate: 0 },
      footerQuote: { visible: true, offsetX: 0, offsetY: 0, rotate: 0 }
    };
  }

  Object.keys(decMap).forEach(key => {
    const elId = decMap[key];
    const el = document.getElementById(elId);
    if (!el) return;

    if (!state.decorators[key]) {
      state.decorators[key] = { visible: true, offsetX: 0, offsetY: 0, rotate: 0 };
    }

    // Attach Pointer Drag Handler
    attachDecoratorPointerDrag(el, key);

    // Initial transform & visibility
    const dData = state.decorators[key];
    el.style.display = dData.visible !== false ? "" : "none";
    el.style.transform = `translate3d(${dData.offsetX || 0}px, ${dData.offsetY || 0}px, 0) rotate(${dData.rotate || 0}deg)`;
  });

  // Global Click listener for decorator action buttons (Delete, Rotate Left, Rotate Right, Color)
  document.addEventListener("click", (e) => {
    // Deselect decorator if clicking outside
    if (!e.target.closest(".canva-decorator-element") && !e.target.closest(".canva-decorator-toolbar") && !e.target.closest(".canva-tool-action-btn")) {
      document.querySelectorAll(".canva-selected-decorator").forEach(c => c.classList.remove("canva-selected-decorator"));
    }

    const btnDel = e.target.closest(".btn-dec-delete");
    const btnRotL = e.target.closest(".btn-dec-rotate-left");
    const btnRotR = e.target.closest(".btn-dec-rotate-right");
    const btnColor = e.target.closest(".btn-dec-color");

    if (btnDel) {
      const decKey = btnDel.dataset.dec;
      if (decKey && state.decorators[decKey]) {
        state.decorators[decKey].visible = false;
        const el = document.getElementById(decMap[decKey]);
        if (el) el.style.display = "none";
        saveStateToHistory();
      }
    } else if (btnRotL) {
      const decKey = btnRotL.dataset.dec;
      if (decKey && state.decorators[decKey]) {
        state.decorators[decKey].rotate = (state.decorators[decKey].rotate || 0) - 5;
        applyDecoratorTransform(decKey);
        saveStateToHistory();
      }
    } else if (btnRotR) {
      const decKey = btnRotR.dataset.dec;
      if (decKey && state.decorators[decKey]) {
        state.decorators[decKey].rotate = (state.decorators[decKey].rotate || 0) + 5;
        applyDecoratorTransform(decKey);
        saveStateToHistory();
      }
    } else if (btnColor) {
      const decKey = btnColor.dataset.dec;
      if (decKey === "headerGoals") {
        const colors = ["butter", "matcha", "peach", "lavender", "sky"];
        const curColor = state.decorators.headerGoals.color || "butter";
        const nextIdx = (colors.indexOf(curColor) + 1) % colors.length;
        const nextColor = colors[nextIdx];
        state.decorators.headerGoals.color = nextColor;

        const el = document.getElementById("decoratorHeaderGoals");
        if (el) {
          el.className = `header-pinned-note canva-decorator-element card-color-${nextColor}`;
        }
        saveStateToHistory();
      }
    }
  });
}

function applyDecoratorTransform(decKey) {
  const decMap = {
    headerStamp: "decoratorHeaderStamp",
    headerGoals: "decoratorHeaderGoals",
    footerBarcode: "decoratorFooterBarcode",
    footerQuote: "decoratorFooterQuote"
  };
  const el = document.getElementById(decMap[decKey]);
  const decData = state.decorators[decKey];
  if (el && decData) {
    el.style.transform = `translate3d(${decData.offsetX || 0}px, ${decData.offsetY || 0}px, 0) rotate(${decData.rotate || 0}deg)`;
  }
}

// Call modal & AI setup listeners at startup
setupAestheticColorModalListeners();
setupAiScheduleAutoFill();
initDecoratorElements();
setupGlobalToolbar();

