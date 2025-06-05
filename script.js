let typeInterval; 

/**
 * Simulates a typewriter effect on an HTML element.
 * @param {HTMLElement} element - The target element to display the typing.
 * @param {string} text - The text to type out.
 * @param {number} [speed=150] - The delay between characters in milliseconds.
 */
function typeWriter(element, text, speed = 120) {
  if (element._twInterval) clearInterval(element._twInterval);
  element.innerHTML = '';
  let i = 0, cursorVisible = true;
  const cursorSpan = document.createElement('span');
  cursorSpan.className = 'typing-cursor';

  element.appendChild(document.createTextNode(''));

  element._twInterval = setInterval(() => {
    if (element.contains(cursorSpan)) {
      element.removeChild(cursorSpan);
    }

    if (i < text.length) {
      element.firstChild.nodeValue += text.charAt(i++);
      element.appendChild(cursorSpan);
    } else {
      cursorSpan.style.visibility = cursorVisible ? 'visible' : 'hidden';
      cursorVisible = !cursorVisible;
      if (!element.contains(cursorSpan)) element.appendChild(cursorSpan);
    }
  }, speed);
}

function handleReflexiveToggle() {
    const toggleReflexiveBtn = document.getElementById('toggle-reflexive');
	
    if (!toggleReflexiveBtn) return;

    toggleReflexiveBtn.classList.toggle('selected');
    if (typeof soundClick !== 'undefined') soundClick.play();
}

const soundClick = document.getElementById('sound-click');
let openFilterDropdownMenu = null; 
let tenseDropdownInitialized = false;

document.addEventListener('DOMContentLoaded', async () => {
  let selectedGameMode = 'infinite'; 
  let allVerbData = [];
  let currentQuestion = {};
  let currentOptions = {};
  let score = 0, streak = 0, multiplier = 1.0, startTime = 0;
  let bestStreak = 0;
  let countdownTimer;
  let countdownTime = 240; 
  let remainingLives = 5;
  let targetVolume=0.2;
  let timerTimeLeft = 0;            
	function formatTime(sec) {
	  const m = Math.floor(sec / 60);
	  const s = sec % 60;
	  return `${m}:${s.toString().padStart(2,'0')}`;
	}


	function showTimeChange(amount) {
	  const clockEl = document.getElementById('timer-clock');
	  const el      = document.getElementById('time-change');
	  if (!clockEl || !el) return;

	  
	  el.textContent = `${amount > 0 ? '+' : ''}${amount}s`;
	  el.style.color = amount < 0 ? 'red' : 'lightgreen';

	  
	  clockEl.classList.add('show-time-change');
	  clearTimeout(clockEl._timeChangeTimeout);
	  clockEl._timeChangeTimeout = setTimeout(() => {
		clockEl.classList.remove('show-time-change');
	  }, 2000);

	  
	  el.classList.remove('vibrate');
	  void el.offsetWidth;         
	  el.classList.add('vibrate');
	}
  let totalPlayedSeconds = 0;       
  let totalQuestions = 0;           
  let totalCorrect = 0;  
  let initialRawVerbData = [];  
  const gameScreen   = document.getElementById('game-screen');
  const quitButton   = document.getElementById('quit-button');
  
  
  
  const scoreDisplay = document.getElementById('score-display');
  const rankingBox   = document.getElementById('ranking-box');
  const flameEl      = document.getElementById('flames');
  const gameTitle    = document.getElementById('game-title');
  const qPrompt      = document.getElementById('question-prompt');
  
  
  const esContainer  = document.getElementById('input-es-container');
  const enContainer  = document.getElementById('input-en-container');
  const feedback     = document.getElementById('feedback-area');
  const helpButton = document.getElementById('help-button'); 
  const tooltip = document.getElementById('tooltip');   
  const toggleReflexiveBtn = document.getElementById('toggle-reflexive');
  const titleElement = document.querySelector('.glitch-title');
  const verbTypeLabels = Array.from(document.querySelectorAll('label[data-times]'));
  const soundCorrect = new Audio('sounds/correct.mp3');
  const soundWrong = new Audio('sounds/wrong.mp3');
  const soundClick = new Audio('sounds/click.mp3');
  const soundStart = new Audio('sounds/start-verb.mp3');
  const soundSkip = new Audio('sounds/skip.mp3');
  const menuMusic = new Audio('sounds/musicmenu.mp3');
  const gameMusic = new Audio('sounds/musicgame.mp3');
  let currentMusic = menuMusic;
  const soundGameOver = new Audio('sounds/gameover.mp3');
  const soundbubblepop = new Audio('sounds/soundbubblepop.mp3');
  const soundLifeGained = new Audio('sounds/soundLifeGained.mp3');
  const container = document.getElementById('verb-buttons');
  const allBtns   = () => Array.from(container.querySelectorAll('.verb-button'));
let currentConfigStep = 'splash'; 
let selectedMode = null;
let selectedDifficulty = null;
let provisionallySelectedOption = null; 


const configFlowScreen = document.getElementById('config-flow-screen');
const splashStep = document.getElementById('splash-step');
const pressKeyText = document.getElementById('press-key-text');
const initialStartButton = document.getElementById('initial-start-button');

const modeSelectionStep = document.getElementById('mode-step');
const gameModesContainer = document.getElementById('game-modes-container');
const confirmModeButton = document.getElementById('confirm-mode-button');

const difficultySelectionStep = document.getElementById('difficulty-step');
const difficultyButtonsContainer = document.getElementById('difficulty-buttons-container');
const confirmDifficultyButton = document.getElementById('confirm-difficulty-button');

const detailsConfigStep = document.getElementById('details-config-step');
const finalStartGameButton = document.getElementById('final-start-game-button');
const backButton = document.getElementById('back-button');

const infoPanelTitle = document.getElementById('info-panel-title');
const infoPanelContent = document.getElementById('info-panel-content');


const configButtonsData = {}; 

confirmModeButton.addEventListener('click', () => {
    if (provisionallySelectedOption) {
        if (soundClick) soundClick.play();
        selectedMode = provisionallySelectedOption.dataset.mode;
        window.selectedGameMode = selectedMode; 

        gameModesContainer.querySelectorAll('.config-flow-button').forEach(btn => {
            btn.classList.remove('provisional-selection');
            if (btn === provisionallySelectedOption) {
                btn.classList.add('confirmed-selection');
                btn.style.display = ''; 
            } else {
                btn.classList.remove('confirmed-selection');
                btn.style.display = 'none'; 
            }
        });

        
        if (modeSelectionStep) {
            modeSelectionStep.classList.add('step-section-completed');
            const modeHeading = modeSelectionStep.querySelector('h3');
            if (modeHeading) modeHeading.style.display = 'none';
        }

        confirmModeButton.style.display = 'none';
        navigateToStep('difficulty');
    }
});

confirmDifficultyButton.addEventListener('click', () => {
    if (provisionallySelectedOption) {
        if (soundClick) soundClick.play();
        selectedDifficulty = provisionallySelectedOption.dataset.mode;

        difficultyButtonsContainer.querySelectorAll('.config-flow-button').forEach(btn => {
            btn.classList.remove('provisional-selection');
            if (btn === provisionallySelectedOption) {
                btn.classList.add('confirmed-selection');
                btn.style.display = '';
            } else {
                btn.classList.remove('confirmed-selection');
                btn.style.display = 'none';
            }
        });

        
        if (difficultySelectionStep) {
            difficultySelectionStep.classList.add('step-section-completed');
            const diffHeading = difficultySelectionStep.querySelector('h3');
            if (diffHeading) diffHeading.style.display = 'none';
        }

        confirmDifficultyButton.style.display = 'none';
        navigateToStep('details');
    }
});
backButton.addEventListener('click', () => {
    if (soundClick) soundClick.play();
    let targetStepToGoBackTo = '';

    if (currentConfigStep === 'details') {
        document.getElementById('details-step').classList.remove('active-step');
        document.getElementById('details-step').style.display = 'none'; 

        const difficultyStepDiv = document.getElementById('difficulty-step');
        if (difficultyStepDiv) { 
            difficultyStepDiv.classList.remove('step-section-completed');
            const diffHeading = difficultyStepDiv.querySelector('h3');
            if (diffHeading) diffHeading.style.display = '';
            difficultyButtonsContainer.querySelectorAll('.config-flow-button').forEach(btn => {
                btn.style.display = ''; 
                btn.disabled = false;
                btn.classList.remove('confirmed-selection', 'provisional-selection');
            });
            if (configButtonsData[selectedDifficulty]?.buttonElement) {
                configButtonsData[selectedDifficulty].buttonElement.classList.remove('confirmed-selection');
            }
        }
        selectedDifficulty = null; 
        targetStepToGoBackTo = 'difficulty';

    } else if (currentConfigStep === 'difficulty') {
        const difficultyStepDiv = document.getElementById('difficulty-step');
        if (difficultyStepDiv) {
            difficultyStepDiv.classList.remove('active-step', 'step-section-completed');
            difficultyStepDiv.style.display = 'none';
        }

        const modeStepDiv = document.getElementById('mode-step');
        if (modeStepDiv) {
            modeStepDiv.classList.remove('step-section-completed');
            const modeHeading = modeStepDiv.querySelector('h3');
            if (modeHeading) modeHeading.style.display = '';
            gameModesContainer.querySelectorAll('.config-flow-button').forEach(btn => {
                btn.style.display = ''; 
                btn.disabled = false;
                btn.classList.remove('confirmed-selection', 'provisional-selection');
            });
            if (configButtonsData[selectedMode]?.buttonElement) {
               configButtonsData[selectedMode].buttonElement.classList.remove('confirmed-selection');
            }
        }
        selectedMode = null; 
        window.selectedGameMode = null;
        targetStepToGoBackTo = 'mode';

    } else if (currentConfigStep === 'mode') {
        const modeStepDiv = document.getElementById('mode-step');
        if (modeStepDiv) {
             modeStepDiv.classList.remove('active-step', 'step-section-completed');
             modeStepDiv.style.display = 'none';
             const modeHeading = modeStepDiv.querySelector('h3');
             if (modeHeading) modeHeading.style.display = '';
        }
        targetStepToGoBackTo = 'splash';
    }

    if(targetStepToGoBackTo) {
        navigateToStep(targetStepToGoBackTo); 
    }
});
  menuMusic.loop = true;
  gameMusic.loop = true;
  menuMusic.volume = targetVolume;
  menuMusic.play();
  currentMusic = menuMusic;
  setInterval(() => {
    titleElement.classList.add('glitch-active');
    setTimeout(() => {
      titleElement.classList.remove('glitch-active');
    }, 600); 
  }, 3000); 

	const titleEl = document.querySelector('.glitch-title, #main-title');
	if (titleEl) {
	  const letters = Array.from(titleEl.textContent);

	  
	  let seenT = false;
	  let seenC = false;

	  titleEl.innerHTML = letters
		.map(ch => {
		  if (ch === ' ') {
			return '<span class="letter space">&nbsp;</span>';
		  }
		  
		  let extraClass = '';
		  if (ch === 'T' && !seenT) {
			extraClass = ' big-letter';
			seenT = true;
		  }
		  if (ch === 'C' && !seenC) {
			extraClass += ' big-letter';
			seenC = true;
		  }
		  return `<span class="letter${extraClass}">${ch}</span>`;
		})
		.join('');
	}
    let loaded = false;
    try {
      const resp = await fetch(`verbos.json?cb=${Date.now()}`);
      if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
      initialRawVerbData = await resp.json();
      loaded = true;
    } catch (err) {
      console.error('Could not fetch verbos.json:', err);
      alert('Error cargando datos de los verbos.');
    }
 

  const pronouns = ['yo','tú','él','nosotros','vosotros','ellos'];
  const pronounMap = {
    yo: ['I'],
    tú: ['you'],
    él: ['he', 'she'],
	usted: ['he', 'she'],
    nosotros: ['we'],
    vosotros: ['you'],
    ellos: ['they'],
    nosotras: ['we'], 
    vosotras: ['you'], 
    ellas: ['they'], 
    ustedes: ['you'] 
};

const pronounGroups = [
  { label: 'yo',                   values: ['yo'] },
  { label: 'tú',                   values: ['tú'] },
  { label: 'él / ella / usted',    values: ['él'] },
  { label: 'nosotros / nosotras',  values: ['nosotros'] },
  { label: 'vosotros / vosotras',  values: ['vosotros'] },
  { label: 'ellos / ellas / ustedes', values: ['ellos'] }
];

function updatePronounDropdownCount() {
  const btns     = document.querySelectorAll('.pronoun-group-button');
  const selected = document.querySelectorAll('.pronoun-group-button.selected').length;
  document.getElementById('pronoun-dropdown-count')
          .textContent = `(${selected}/${btns.length})`;
}

  const irregularityTypes = [
    { value: 'regular', name: 'Regular', times: ['present', 'past_simple', 'present_perfect', 'future_simple', 'condicional_simple', 'imperfect_indicative'], hint: '' }, 
    { value: 'first_person_irregular', name: '1st Person', times: ['present'], hint: '⚙️ salir -> salgo' },
    { value: 'stem_changing', name: 'Stem Change', times: ['present'], hint: '⚙️ dormir -> duermo' },
    { value: 'multiple_irregularities', name: 'Multiple', times: ['present'], hint: '⚙️ tener -> tengo, tienes' },
    { value: 'y_change', name: 'Y Change', times: ['present','past_simple'], hint: '⚙️ oír -> oyes' },
    { value: 'irregular_root', name: 'Irreg. Root', times: ['past_simple'], hint: '⚙️ estar -> estuve' },
    { value: 'stem_change_3rd_person', name: 'Stem 3rd P.', times: ['past_simple'], hint: '⚙️ morir -> murió' },
    { value: 'totally_irregular', name: 'Totally Irreg.', times: ['past_simple'], hint: '⚙️ ser/ir -> fui' }, 
    { value: 'irregular_participle', name: 'Irreg. Participle', times: ['present_perfect'], hint: '⚙️ ver -> visto' },
	{ value: 'irregular_future_conditional', name: 'Irregular Future / Conditional', times: ['future_simple', 'condicional_simple'], hint: '⚙️ tener -> tendré'},
	{ value: 'irregular_imperfect', name: 'Irregular imperfect', times: ['imperfect_indicative'], hint: '⚙️ ir -> iba'}
];
  const tenses = [
    { value: 'present',        name: 'Present'       },
    { value: 'past_simple',    name: 'Simple Past'   },
    { value: 'present_perfect',name: 'Present Perfect'},
	{ value: 'imperfect_indicative', name: 'Imperfect' },
	{ value: 'future_simple',        name: 'Future' },
	{ value: 'condicional_simple',   name: 'Condicional' }
];

  let totalCorrectAnswersForLife = 0; 
  let correctAnswersToNextLife = 10;  
  let nextLifeIncrement = 10;         

  let currentStreakForLife = 0;       
  let streakGoalForLife = 5;          
  let lastStreakGoalAchieved = 0;     

  let isPrizeVerbActive = false;      
	document.addEventListener('keydown', (e) => {
		if (e.key === 'Escape') {
			
			if (specificModal && (specificModal.style.display === 'flex' || specificModal.style.display === 'block') ) {
				closeSpecificModal();
				return; 
			}
			if (tooltip && tooltip.style.display === 'block') {
				tooltip.style.display = 'none';
				if (document.body) document.body.classList.remove('tooltip-open-no-scroll');
				if (window.typeInterval) clearInterval(window.typeInterval);
				return; 
			}

			
			if (configFlowScreen.style.display === 'flex') { 
				if (currentConfigStep === 'details' || currentConfigStep === 'difficulty') {
					if (backButton.style.display !== 'none') { 
						backButton.click(); 
					}
				} else if (currentConfigStep === 'mode') {
					
					navigateToStep('splash');
				}
				
			}
		}
	});
function playHeaderIntro() {
  const header = document.querySelector('.main-header');
  header.classList.remove('animate');
  void header.offsetWidth;
  header.classList.add('animate');
}
playHeaderIntro();
function navigateToStep(stepName) {
    const allSteps = document.querySelectorAll('.config-step');
    const stepsOrder = ['splash', 'mode', 'difficulty', 'details'];
    const targetIndex = stepsOrder.indexOf(stepName);
    const configFlowScreenDiv = document.getElementById('config-flow-screen'); 
    const infoPanel = document.querySelector('.config-info-panel'); 
    const recordsSection = document.getElementById('setup-records');

    if (recordsSection) {
        recordsSection.style.display = stepName === 'splash' ? 'flex' : 'none';
        if (stepName === 'splash') renderSetupRecords();
    }

    allSteps.forEach(stepDiv => {
        const stepIdWithoutSuffix = stepDiv.id.replace('-step', '');
        const stepIndexInOrder = stepsOrder.indexOf(stepIdWithoutSuffix);

        if (stepIndexInOrder === targetIndex) {
            stepDiv.classList.add('active-step');
            stepDiv.classList.remove('step-section-completed');
            stepDiv.style.display = 'block';
        } else if (stepDiv.classList.contains('step-section-completed') && stepIndexInOrder < targetIndex) {
            stepDiv.classList.remove('active-step');
            stepDiv.style.display = 'block';
        } else {
            stepDiv.classList.remove('active-step', 'step-section-completed');
            stepDiv.style.display = 'none';
        }
    });

    currentConfigStep = stepName;
    provisionallySelectedOption = null; 

    if (confirmModeButton) confirmModeButton.style.display = 'none';
    if (confirmDifficultyButton) confirmDifficultyButton.style.display = 'none';

    if (stepName === 'splash') {
        if (configFlowScreenDiv) configFlowScreenDiv.classList.add('splash-active'); 
        if (infoPanel) infoPanel.style.display = 'none'; 
        if (backButton) backButton.style.display = 'none';
        document.addEventListener('keydown', handleInitialKeyPress);
        if (initialStartButton) initialStartButton.disabled = false; 
        
        

        
        allSteps.forEach(s => {
            if (s.id !== 'splash-step') {
                s.classList.remove('active-step', 'step-section-completed');
                s.style.display = 'none'; 
                s.querySelectorAll('.config-flow-button').forEach(btn => {
                    btn.classList.remove('confirmed-selection', 'provisional-selection');
                    btn.style.display = ''; 
                    btn.disabled = false;
                });
            }
        });
        selectedMode = null; window.selectedGameMode = null;
        selectedDifficulty = null;

    } else { 
        if (configFlowScreenDiv) configFlowScreenDiv.classList.remove('splash-active'); 
        if (infoPanel) infoPanel.style.display = 'block'; 
        if (backButton) backButton.style.display = 'block'; 
        document.removeEventListener('keydown', handleInitialKeyPress);
        if (initialStartButton) initialStartButton.disabled = true; 

        const modeInfoTitle = selectedMode ? (specificInfoData[configButtonsData[selectedMode]?.infoKey]?.title || selectedMode.replace(/_/g, ' ')) : "Not selected";
        const diffInfoTitle = selectedDifficulty ? (specificInfoData[configButtonsData[selectedDifficulty]?.infoKey]?.title || selectedDifficulty.replace(/_/g, ' ')) : "Not selected";

        if (stepName === 'mode') {
            updateInfoPanelContent('Select Game Mode', '<p>Choose how you want to play. Details will appear here when you select a mode.</p>');
            const firstModeButton = gameModesContainer.querySelector('.config-flow-button:not([style*="display: none"])');
            if (firstModeButton) focusOption(firstModeButton, gameModesContainer);
        } else if (stepName === 'difficulty') {
            updateInfoPanelContent('Select Difficulty', `<p>Mode: <strong>${modeInfoTitle}</strong>.<br>Choose the game's challenge level. Details for the selected difficulty will appear here.</p>`);
            const firstDiffButton = difficultyButtonsContainer.querySelector('.config-flow-button:not([style*="display: none"])');
            if (firstDiffButton) focusOption(firstDiffButton, difficultyButtonsContainer);
        } else if (stepName === 'details') {
            
            updateInfoPanelContent('Customize Your Game', `<p> <strong><span class="math-inline">\</strong\> </strong>.<br>Adjust tenses, verbs, pronouns, and other options.</p>`);
            checkFinalStartButtonState();
        }
    }
}
function updateInfoPanelContent(title, htmlContent) {
    infoPanelTitle.textContent = title;
    infoPanelContent.innerHTML = htmlContent;
    
    const recallAnim = infoPanelContent.querySelector('#recall-example-anim');
    const conjugateAnim = infoPanelContent.querySelector('#conjugate-example-anim');
    const produceAnim = infoPanelContent.querySelector('#produce-example-anim');

    if (window.typeInterval) clearInterval(window.typeInterval); 

    if (recallAnim) setTimeout(() => typeWriter(recallAnim, 'I ate', 150), 50);
    if (conjugateAnim) setTimeout(() => typeWriter(conjugateAnim, 'conjugamos', 150), 50);
    if (produceAnim) setTimeout(() => typeWriter(produceAnim, 'amo', 150), 50);
}
function updateSelectAllPronounsButtonText() {
  const pronounButtons = document.querySelectorAll('#pronoun-buttons .pronoun-group-button');
  const selectAllPronounsBtn = document.getElementById('select-all-pronouns');

  if (!selectAllPronounsBtn || pronounButtons.length === 0) {
    if (selectAllPronounsBtn) selectAllPronounsBtn.textContent = 'Seleccionar Todo';
    return;
  }

  const allSelected = Array.from(pronounButtons).every(btn => btn.classList.contains('selected'));
  selectAllPronounsBtn.textContent = allSelected ? 'No pronouns' : 'All pronouns';
}

function closeOtherFilterDropdowns(currentMenuToIgnore) {
    const allFilterMenus = document.querySelectorAll('.filter-bar .dropdown-menu');
    allFilterMenus.forEach(menu => {
        if (menu !== currentMenuToIgnore) {
            menu.classList.add('hidden');
        }
    });
    
    
    
    if (currentMenuToIgnore && !currentMenuToIgnore.classList.contains('hidden')) {
        openFilterDropdownMenu = currentMenuToIgnore;
    } else {
        openFilterDropdownMenu = null;
    }
}

function updateVerbDropdownCount() {
  const buttons = document.querySelectorAll('#verb-buttons .verb-button');
  const selected = Array.from(buttons)
                        .filter(b => b.classList.contains('selected'))
                        .length;
  const total = buttons.length;
  document.getElementById('verb-dropdown-count')
          .textContent = `(${selected}/${total})`;
}
if (loaded) {
  renderVerbButtons();
  initVerbDropdown();
  renderTenseButtons();
  initTenseDropdown();
  renderPronounButtons();
  initPronounDropdown();
  renderVerbTypeButtons();
  filterVerbTypes();  
  renderSetupRecords();
}
  const dropdownBtn     = document.getElementById('verb-dropdown-button');
  const dropdownMenu    = document.getElementById('verb-dropdown-menu');
  const selectAllBtn    = document.getElementById('select-all-verbs');
  const allButtons      = () => Array.from(document.querySelectorAll('.verb-button'));
  

  
  document.querySelectorAll('input[type="checkbox"], input[type="radio"], select')
    .forEach(el => {
      el.addEventListener('change', () => {
        soundClick.play();
      });
    });
	
   function updateTenseDropdownCount() {
		const tenseButtonsNodeList = document.querySelectorAll('#tense-buttons .tense-button'); 
		const total = tenseButtonsNodeList.length;
		const selected = Array.from(tenseButtonsNodeList).filter(btn => btn.classList.contains('selected')).length;
		
		const countElement = document.getElementById('tense-dropdown-count');
		if (countElement) {
			countElement.textContent = `(${selected}/${total})`;
		}
   }
	
  function renderTenseButtons() {
    const container = document.getElementById('tense-buttons');
    container.innerHTML = '';
    tenses.forEach(t => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.classList.add('tense-button');
      btn.dataset.value = t.value;
      btn.textContent = t.name;
      
      if (t.value === 'present') btn.classList.add('selected');
      btn.addEventListener('click', () => {
        soundClick.play();
        btn.classList.toggle('selected');
        document.querySelectorAll('.verb-type-button.selected').forEach(typeBtn => {
            typeBtn.classList.remove('selected'); 
        });
        
        const regularTypeBtn = document.querySelector('.verb-type-button[data-value="regular"]');
        if (regularTypeBtn && !regularTypeBtn.disabled) { 
            regularTypeBtn.classList.add('selected');
        }
        filterVerbTypes();  
		updateTenseDropdownCount(); 
        updateSelectAllTensesButtonText(); 
      });
      container.appendChild(btn);
    });
    updateTenseDropdownCount(); 
    updateSelectAllTensesButtonText(); 
    }

function initTenseDropdown() {
  let dropdownBtnEl = document.getElementById('tense-dropdown-button');
  let dropdownMenuEl = document.getElementById('tense-dropdown-menu');
  let selectAllTensesEl = document.getElementById('select-all-tenses');

  
  if (dropdownBtnEl) {
    let newDropdownBtn = dropdownBtnEl.cloneNode(true); 
    dropdownBtnEl.parentNode.replaceChild(newDropdownBtn, dropdownBtnEl);
    dropdownBtnEl = newDropdownBtn; 
  }

  if (selectAllTensesEl) {
    let newSelectAllTenses = selectAllTensesEl.cloneNode(true);
    selectAllTensesEl.parentNode.replaceChild(newSelectAllTenses, selectAllTensesEl);
    selectAllTensesEl = newSelectAllTenses; 
  }
  

  
  if (dropdownBtnEl && dropdownMenuEl) {
    dropdownBtnEl.addEventListener('click', e => {
      e.stopPropagation();
      const isCurrentlyHidden = dropdownMenuEl.classList.contains('hidden');

      if (isCurrentlyHidden) {
        
        closeOtherFilterDropdowns(null); 
        dropdownMenuEl.classList.remove('hidden');
        openFilterDropdownMenu = dropdownMenuEl; 
      } else {
        
        dropdownMenuEl.classList.add('hidden');
        if (openFilterDropdownMenu === dropdownMenuEl) {
          openFilterDropdownMenu = null; 
        }
      }
    });
  }

  if (selectAllTensesEl) {
    selectAllTensesEl.addEventListener('click', () => {
      if (typeof soundClick !== 'undefined' && soundClick.play) {
          soundClick.play();
      }
      
      const currentTenseButtons = Array.from(document.querySelectorAll('#tense-buttons .tense-button'));
      const allCurrentlySelected = currentTenseButtons.length > 0 && currentTenseButtons.every(btn => btn.classList.contains('selected'));
      
      currentTenseButtons.forEach(btn => {
          btn.classList.toggle('selected', !allCurrentlySelected);
      });
      
      filterVerbTypes();
      updateTenseDropdownCount();
      updateSelectAllTensesButtonText(); 
    });
  }

  updateTenseDropdownCount();
  updateSelectAllTensesButtonText();
}
	
function updateCurrentPronouns() {
  const selectedBtns = Array.from(document.querySelectorAll('.pronoun-group-button'))
                            .filter(b => b.classList.contains('selected'));
  const flat = selectedBtns.flatMap(b => JSON.parse(b.dataset.values));
  
  window.pronouns = flat;
}
  
function filterVerbTypes() {
  console.log("filterVerbTypes ejecutándose...");
  const selectedTenses = getSelectedTenses();

  document.querySelectorAll('.verb-type-button').forEach(button => {
    const applicableTensesForButton = button.dataset.times.split(',');
    const isEnabled = applicableTensesForButton.some(t => selectedTenses.includes(t));
    
    button.disabled = !isEnabled;
    button.classList.toggle('disabled', !isEnabled);

    if (!isEnabled && button.classList.contains('selected')) {
      button.classList.remove('selected');

      if (selectedTenses.includes('present')) {
        const verbTypeValue = button.dataset.value;
        const typeInfoFromArray = irregularityTypes.find(it => it.value === verbTypeValue); 
        const multipleIrrBtn = document.querySelector('.verb-type-button[data-value="multiple_irregularities"]');

        if (multipleIrrBtn && multipleIrrBtn.classList.contains('selected')) {
          const irregularRootDef = irregularityTypes.find(it => it.value === 'irregular_root');
          const irregularRootAppliesToPresent = irregularRootDef ? irregularRootDef.times.includes('present') : false;
          
          if (verbTypeValue === 'first_person_irregular' || 
              (verbTypeValue === 'irregular_root' && irregularRootAppliesToPresent)) {
            console.log(`Dependencia: Deseleccionando 'multiple_irregularities' (en filterVerbTypes) debido a ${verbTypeValue}`);
            multipleIrrBtn.classList.remove('selected');
          }
        }
      }
    }
  });

  console.log("filterVerbTypes -> llamando a applyIrregularityAndTenseFiltersToVerbList");
  applyIrregularityAndTenseFiltersToVerbList();
  console.log("filterVerbTypes -> llamando a updateVerbTypeButtonsVisualState");
  updateVerbTypeButtonsVisualState(); 
}

  const gameModeButtons = document.querySelectorAll('#game-modes .mode-button');
  gameModeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      selectedGameMode = btn.dataset.mode;
      soundClick.play();
      gameModeButtons.forEach(b => b.classList.remove('selected-mode'));
      btn.classList.add('selected-mode');
      document.getElementById('setup-screen').style.display = 'block';
      filterVerbTypes();
      console.log('Selected mode:', selectedGameMode);
    });
  });

  const configButtons = document.querySelectorAll('.config-button');
  configButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      currentOptions.mode = btn.dataset.mode;
      soundClick.play();
      configButtons.forEach(b => b.classList.remove('selected-mode'));
      btn.classList.add('selected-mode');
      console.log('Selected config mode:', currentOptions.mode);
    });
  });


const musicToggle = document.getElementById('music-toggle');
const volumeSlider = document.getElementById('volume-slider');
volumeSlider.value = targetVolume;  
volumeSlider.addEventListener('input', () => {
  targetVolume = parseFloat(volumeSlider.value);
  currentMusic.volume = targetVolume;
});

let musicPlaying = true;

musicToggle.addEventListener('click', () => {
  if (currentMusic.paused) {
    currentMusic.volume = targetVolume;  
    currentMusic.play();
    musicToggle.textContent = '🔊';
    volumeSlider.disabled = false;
  } else {
    currentMusic.pause();
    musicToggle.textContent = '🔇';
    volumeSlider.disabled = true;
  }
});

function renderVerbButtons() {
  const container = document.getElementById('verb-buttons');
  container.innerHTML = '';

  const verbsSorted = [...initialRawVerbData].sort((a, b) =>
    a.infinitive_es.localeCompare(b.infinitive_es, 'es', { sensitivity: 'base' })
  );

  verbsSorted.forEach(v => {
    const btn = document.createElement('button');
    btn.type          = 'button';
    const infinitive = v.infinitive_es.trim();
    btn.classList.add('verb-button');

    if (infinitive.endsWith('se')) {
      btn.classList.add('verb-button-reflexive');
    } else if (infinitive.endsWith('ar')) {
      btn.classList.add('verb-button-ar');
    } else if (infinitive.endsWith('er')) {
      btn.classList.add('verb-button-er');
    } else if (infinitive.endsWith('ir')) {
      btn.classList.add('verb-button-ir');
    }

    
    
        
    

    btn.dataset.value = infinitive;
    btn.innerHTML = `
      <span class="tick"></span>
      <span class="label">${infinitive} — ${v.infinitive_en}</span>
    `;
    container.appendChild(btn);
  });
}
	
	
	function updateGroupButtons() {
	  
	  
	  

	  
	  const currentVerbButtons = allBtns(); 

	  document.querySelectorAll('#verb-groups-panel .group-button')
		.forEach(gb => {
		  const grp = gb.dataset.group;

		  
		  const matched = currentVerbButtons.filter(b => { 
			const inf = b.dataset.value;
			const normalizedInf = removeAccents(inf); 

			if (grp === 'all') return true;
			if (grp === 'reflexive') return inf.endsWith('se');
			
			if (grp === 'ar') return !inf.endsWith('se') && inf.endsWith('ar'); 
			if (grp === 'er') return !inf.endsWith('se') && inf.endsWith('er');
			if (grp === 'ir') return !inf.endsWith('se') && inf.endsWith('ir');
			
			
			return false; 
		  });

		  const allOn = matched.length > 0 && matched.every(b => b.classList.contains('selected'));
		  gb.classList.toggle('active', allOn);
		});
	}
	function updateSelectAllTensesButtonText() {
	  const tenseButtons = document.querySelectorAll('#tense-buttons .tense-button');
	  const selectAllTensesBtn = document.getElementById('select-all-tenses');

	  if (!selectAllTensesBtn || tenseButtons.length === 0) {
		if (selectAllTensesBtn) selectAllTensesBtn.textContent = 'Seleccionar Todo';
		return;
	  }

	  const allSelected = Array.from(tenseButtons).every(btn => btn.classList.contains('selected'));
	  selectAllTensesBtn.textContent = allSelected ? 'No tenses...' : 'All tenses!';
	}
	function updateDeselectAllButton() {
	  const verbButtons = allBtns(); 
	  const deselectAllBtn = document.getElementById('deselect-all-verbs'); 

	  if (verbButtons.length === 0) {
		deselectAllBtn.textContent = 'Seleccionar Todo';
		return;
	  }
	  
	  const allSelected = verbButtons.every(b => b.classList.contains('selected'));
	  deselectAllBtn.textContent = allSelected
		? 'No verbs'
		: 'All verbs';
	}
	function initVerbDropdown() {
	  const ddBtn          = document.getElementById('verb-dropdown-button');
	  const menu           = document.getElementById('verb-dropdown-menu');
	  const deselectAllBtn = document.getElementById('deselect-all-verbs');
	  const groupsBtn      = document.getElementById('verb-groups-button');
	  const groupsPanel    = document.getElementById('verb-groups-panel');
	  const searchInput    = document.getElementById('verb-search');


	  
		ddBtn.addEventListener('click', e => {
			e.stopPropagation();
			const isOpening = menu.classList.contains('hidden');

			closeOtherFilterDropdowns(null); 

			if (isOpening) {
				menu.classList.remove('hidden');
				openFilterDropdownMenu = menu; 
				searchInput.focus();
			}
			
			groupsPanel.classList.add('hidden'); 
		});

	  
		deselectAllBtn.addEventListener('click', () => {
		  const verbButtons = allBtns();
		  
		  const allCurrentlySelected = verbButtons.length > 0 && verbButtons.every(b => b.classList.contains('selected'));

		  
		  verbButtons.forEach(b => b.classList.toggle('selected', !allCurrentlySelected));
		  
		  updateVerbDropdownCount();
		  updateDeselectAllButton(); 
		  updateGroupButtons();
		  updateVerbTypeButtonsVisualState();
		});

	  
	  groupsBtn.addEventListener('click', e => {
		e.stopPropagation();
		groupsPanel.classList.toggle('hidden');
	  });

		
		groupsPanel.querySelectorAll('.group-button').forEach(gb => {
		  gb.addEventListener('click', e => {
			e.preventDefault();
			if (soundClick) soundClick.play(); 
			const grp = gb.dataset.group; 

			
			const matched = allBtns().filter(b => {
			  const inf = b.dataset.value;
			  const normalizedInf = removeAccents(inf);
			  
			  if (grp === 'all') return true;
			  if (grp === 'reflexive') return inf.endsWith('se');
			  if (grp === 'ar') return normalizedInf.endsWith('ar');
			  if (grp === 'er') return normalizedInf.endsWith('er');
			  if (grp === 'ir') return normalizedInf.endsWith('ir');
			  
			  return inf.endsWith(grp);
			});

			
			const allCurrentlyOn = matched.every(b => b.classList.contains('selected'));
			matched.forEach(b => 
			  b.classList.toggle('selected', !allCurrentlyOn)
			);

			
			gb.classList.toggle('active', !allCurrentlyOn);

			
			updateVerbDropdownCount();
			updateDeselectAllButton();
			updateGroupButtons();
			updateVerbTypeButtonsVisualState();
		});
	  });

		
		searchInput.addEventListener('input', () => {
			const q = searchInput.value.trim().toLowerCase();
			let visibleCount = 0;
			const noResultsMessage = document.getElementById('verb-search-no-results');

			allBtns().forEach(b => {
				const isVisible = b.textContent.toLowerCase().includes(q);
				b.style.display = isVisible ? '' : 'none';
				if (isVisible) {
					visibleCount++;
				}
			});

			
			if (noResultsMessage) {
				if (visibleCount === 0 && q !== '') { 
					noResultsMessage.classList.remove('hidden');
				} else {
					noResultsMessage.classList.add('hidden');
				}
			}
		});
			searchInput.addEventListener('keydown', e => {
				if (e.key === 'Enter' || e.keyCode === 13) { 
					e.preventDefault(); 

				}
			});
	  
		container.addEventListener('click', e => {
		  const btn = e.target.closest('.verb-button');
		  if (!btn) return;
		  soundClick.play();
		  btn.classList.toggle('selected');

		  updateVerbDropdownCount();
		  updateDeselectAllButton(); 
		  updateGroupButtons();      
		  updateVerbTypeButtonsVisualState(); 
		});

	  
	  updateVerbDropdownCount();
	  updateDeselectAllButton();
	  updateGroupButtons();
	}
	
	function renderPronounButtons() {
	  const container = document.getElementById('pronoun-buttons');
	  container.innerHTML = '';

	  pronounGroups.forEach(group => {
		const btn = document.createElement('button');
		btn.type              = 'button';
		btn.classList.add('pronoun-group-button');
		btn.dataset.values    = JSON.stringify(group.values);
		btn.textContent       = group.label;
		btn.classList.add('selected');  
		container.appendChild(btn);
	  });
	}

function initPronounDropdown() {
  const ddBtn     = document.getElementById('pronoun-dropdown-button');
  const ddMenu    = document.getElementById('pronoun-dropdown-menu');
  const selectAll = document.getElementById('select-all-pronouns'); 
  
  
  const getAllPronounGroupButtons = () => Array.from(document.querySelectorAll('#pronoun-buttons .pronoun-group-button'));

  
  ddBtn.addEventListener('click', e => {
    e.stopPropagation();
    const isOpening = ddMenu.classList.contains('hidden');
    closeOtherFilterDropdowns(null); 
    if (isOpening) {
      ddMenu.classList.remove('hidden');
      openFilterDropdownMenu = ddMenu;
    }
  });

  
  selectAll.addEventListener('click', () => {
    if (typeof soundClick !== 'undefined' && soundClick.play) {
        soundClick.play();
    }
    
    const currentPronounButtons = getAllPronounGroupButtons();
    
    
    const allCurrentlySelected = currentPronounButtons.length > 0 && currentPronounButtons.every(b => b.classList.contains('selected'));
    
    
    
    currentPronounButtons.forEach(b => {
        b.classList.toggle('selected', !allCurrentlySelected);
    });
    
    updatePronounDropdownCount();        
    updateSelectAllPronounsButtonText(); 
    updateCurrentPronouns();             
  });

  
  getAllPronounGroupButtons().forEach(b => { 
    b.addEventListener('click', () => {
      if (typeof soundClick !== 'undefined' && soundClick.play) {
          soundClick.play();
      }
      b.classList.toggle('selected');
      updatePronounDropdownCount();
      updateSelectAllPronounsButtonText(); 
      updateCurrentPronouns();
    });
  });

  
  updatePronounDropdownCount();
  updateSelectAllPronounsButtonText(); 
  updateCurrentPronouns(); 
}
	
document.addEventListener('click', e => {
    if (openFilterDropdownMenu) { 

        
        const isClickOnAnyToggleButton = 
            document.getElementById('tense-dropdown-button').contains(e.target) ||
            document.getElementById('verb-dropdown-button').contains(e.target) ||
            document.getElementById('pronoun-dropdown-button').contains(e.target);

        
        const isClickInsideOpenMenu = openFilterDropdownMenu.contains(e.target);

        if (!isClickOnAnyToggleButton && !isClickInsideOpenMenu) {
            
            
            openFilterDropdownMenu.classList.add('hidden');

            
            
            if (openFilterDropdownMenu.id === 'verb-dropdown-menu') {
                const groupsPanel = document.getElementById('verb-groups-panel');
                if (groupsPanel) {
                    groupsPanel.classList.add('hidden');
                }
            }

            openFilterDropdownMenu = null; 
        }
    }
});  
function handleReflexiveToggle() {
    if (!toggleReflexiveBtn) return; 
    toggleReflexiveBtn.classList.toggle('selected');
    if (typeof soundClick !== 'undefined') soundClick.play();
}
function initStepButtons(container, stepType) {
    const buttons = container.querySelectorAll('.config-flow-button');
    buttons.forEach((button, index) => {
        const dataMode = button.dataset.mode;
        const infoKey = button.dataset.infokey; 
        configButtonsData[dataMode] = { buttonElement: button, infoKey: infoKey };

		button.addEventListener('click', () => {
			if (button.classList.contains('confirmed-selection')) { 
				return; 
			}
			handleOptionProvisionalSelection(button, stepType, infoKey);
		});

        
        button.addEventListener('focus', () => {
            
            if (!provisionallySelectedOption || provisionallySelectedOption.parentElement !== container) {
                const info = specificInfoData[infoKey];
                if (info) {
                    updateInfoPanelContent(info.title, info.html);
                }
            }
        });
    });

    
    container.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
            e.preventDefault();
            const currentFocused = Array.from(buttons).indexOf(document.activeElement);
            const nextButton = buttons[(currentFocused + 1) % buttons.length];
            if (nextButton) nextButton.focus();
        } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
            e.preventDefault();
            const currentFocused = Array.from(buttons).indexOf(document.activeElement);
            const prevButton = buttons[(currentFocused - 1 + buttons.length) % buttons.length];
            if (prevButton) prevButton.focus();
        } else if (e.key === 'Enter' && document.activeElement.classList.contains('config-flow-button')) {
            e.preventDefault();
            const activeBtn = document.activeElement;
            handleOptionProvisionalSelection(activeBtn, stepType, activeBtn.dataset.infokey);
        }
    });
}

function handleOptionProvisionalSelection(buttonElement, stepType, infoKeyToDisplay) {
    if (soundClick) soundClick.play();
    const container = buttonElement.parentElement;
    container.querySelectorAll('.config-flow-button').forEach(btn => {
        btn.classList.remove('provisional-selection');
    });
    buttonElement.classList.add('provisional-selection');
    provisionallySelectedOption = buttonElement;

    const info = specificInfoData[infoKeyToDisplay]; 
    if (info) {
        updateInfoPanelContent(info.title, info.html);
    }

    if (stepType === 'mode') {
        confirmModeButton.style.display = 'block';
        confirmModeButton.focus(); 
    } else if (stepType === 'difficulty') {
        confirmDifficultyButton.style.display = 'block';
        confirmDifficultyButton.focus();
    }
}

function focusOption(buttonElement, container) {
    if (!buttonElement) return;
    container.querySelectorAll('.config-flow-button').forEach(btn => btn.classList.remove('provisional-selection')); 
    buttonElement.focus(); 
}
function renderSetupRecords() {
  const container = document.getElementById('setup-records');
  if (!container) return;

  container.querySelectorAll('.mode-records').forEach(div => {
    const mode = div.dataset.mode;
    const ul = div.querySelector('.record-list');
    ul.innerHTML = '';

    db.collection('records')
      .where('mode', '==', mode)
      .orderBy('score', 'desc')
      .limit(10)
      .get()
      .then(snapshot => {
        if (snapshot.empty) {
          ul.innerHTML = '<li>No hay récords aún</li>';
          return;
        }
        snapshot.forEach((doc, i) => {
          const { name, score, timestamp, streak } = doc.data();
          const date = timestamp?.toDate();
          
          const dateStr = date
            ? date.toLocaleDateString()
            : '–';

          const medal = i === 0 ? '🥇'
                      : i === 1 ? '🥈'
                      : i === 2 ? '🥉'
                      : '';
          const li = document.createElement('li');
          li.innerHTML = `
            <div class="record-item">
              <span class="medal">${medal}</span>
              <strong>${name}:</strong> ${score} pts
              <span class="record-date">${dateStr}</span>
              ${streak
                ? `<span class="record-streak">· Max🔥: ${streak}</span>`
                : ''}
            </div>
          `;
          ul.appendChild(li);
        });
      })
      .catch(error => {
        console.error('Error al cargar récords:', error);
        ul.innerHTML = '<li>Error cargando récords</li>';
      });
  });
}

  function removeAccents(str) {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g,'');
  }


async function loadVerbs() {
  console.log("loadVerbs se está ejecutando."); 
  try {
    const resp = await fetch(`verbos.json?cb=${Date.now()}`);
    if (!resp.ok) throw new Error('Network response was not ok');
    initialRawVerbData = await resp.json();
  } catch (error) {
    console.error("Error fetching raw verb data:", error);
    alert("Could not load verb data file.");
    return false;
  }

  
  const selectedTypeBtns = Array.from(
    document.querySelectorAll('.verb-type-button.selected')
  );
  const selectedTypes = selectedTypeBtns.map(b => b.dataset.value);
  if (selectedTypes.length === 0) {
    alert('Please select at least one verb type.');
	allVerbData = []
    return false;
  }

  
  const manuallySelectedVerbInfinitives = Array.from(
    document.querySelectorAll('#verb-buttons .verb-button.selected')
  ).map(b => b.dataset.value);

  let verbsToConsiderForGame = [];

  if (manuallySelectedVerbInfinitives.length > 0) {
    
    console.log("Manual verb selection active:", manuallySelectedVerbInfinitives);

    
    verbsToConsiderForGame = initialRawVerbData.filter(v => 
        manuallySelectedVerbInfinitives.includes(v.infinitive_es)
    );

    verbsToConsiderForGame = verbsToConsiderForGame.filter(v =>
      currentOptions.tenses.some(tenseKey => v.conjugations[tenseKey] !== undefined)
    );

    if (verbsToConsiderForGame.length === 0) {
      alert('None of the verbs you manually selected are available for the chosen tenses. Please adjust the tenses or your verb selection.');
      allVerbData = [];
      return false;
    }
    console.log("Verbos después de filtro manual y de tiempo:", verbsToConsiderForGame.map(v=>v.infinitive_es));

  } else {
    console.log("Sin selección manual de verbos. Filtrando por tipo de irregularidad y tiempo.");

    if (selectedselectedTypes.length === 0) {
      alert('Please select at least one type of irregularity if you do not choose specific verbs..');
      allVerbData = [];
      return false;
    }

    verbsToConsiderForGame = initialRawVerbData.filter(v =>
      currentOptions.tenses.some(tenseKey => 
        (v.types[tenseKey] || []).some(typeInVerb => 
          selectedIrregularityTypes.includes(typeInVerb) 
        )
      )
    );
    console.log("Verbos después de filtro por irregularidad y tiempo:", verbsToConsiderForGame.map(v=>v.infinitive_es));
  }

  
  if (verbsToConsiderForGame.length === 0) {
    alert('No verbs are available for the selected criteria. Try other filters.');
    allVerbData = [];
    return false;
  }

  allVerbData = verbsToConsiderForGame;
  console.log(`Se usarán ${allVerbData.length} verbos para el juego.`);
  return true;
}

function getSelectedTenses() {
    return Array.from(document.querySelectorAll('#tense-buttons .tense-button.selected'))
                .map(btn => btn.dataset.value);
}


function getVerbObjectByInfinitive(infinitiveEs) {
    return initialRawVerbData.find(v => v.infinitive_es === infinitiveEs);
}


function getIrregularityTypesForVerb(verbObj, selectedTenses) {
    const types = new Set();
    if (verbObj && verbObj.types && selectedTenses) {
        selectedTenses.forEach(tenseKey => {
            (verbObj.types[tenseKey] || []).forEach(type => types.add(type));
        });
    }
    return Array.from(types);
}
function updateVerbTypeButtonsVisualState() {
    const selectedVerbElements = Array.from(document.querySelectorAll('#verb-buttons .verb-button.selected'));
    const selectedVerbInfinitives = selectedVerbElements.map(btn => btn.dataset.value);
    const currentSelectedTenses = getSelectedTenses();
    const allActiveIrregularityTypes = new Set();

    selectedVerbInfinitives.forEach(infinitiveEs => {
        const verbObj = getVerbObjectByInfinitive(infinitiveEs);
        if (verbObj) {
            const typesForVerb = getIrregularityTypesForVerb(verbObj, currentSelectedTenses);
            typesForVerb.forEach(type => allActiveIrregularityTypes.add(type));
        }
    });

    document.querySelectorAll('.verb-type-button').forEach(typeButton => {
        const typeValue = typeButton.dataset.value;
        
        
        if (!typeButton.disabled && allActiveIrregularityTypes.has(typeValue)) {
            typeButton.classList.add('selected');
        } else {
            
            typeButton.classList.remove('selected');
        }
    });
}
function applyIrregularityAndTenseFiltersToVerbList() {
    const currentSelectedTenses = getSelectedTenses();
    const activeIrregularityTypes = Array.from(document.querySelectorAll('.verb-type-button.selected:not(:disabled)'))
                                        .map(btn => btn.dataset.value);

    document.querySelectorAll('#verb-buttons .verb-button').forEach(verbButton => {
        const infinitiveEs = verbButton.dataset.value;

        
        
        if (infinitiveEs.endsWith('se')) {
            
            
            
            
            return; 
        }

        
        const verbObj = getVerbObjectByInfinitive(infinitiveEs);
        if (!verbObj) return;

        const typesForThisVerbInSelectedTenses = getIrregularityTypesForVerb(verbObj, currentSelectedTenses);
        let verbShouldBeSelectedByIrregularity = false;

        if (activeIrregularityTypes.length > 0) {

            verbShouldBeSelectedByIrregularity = typesForThisVerbInSelectedTenses.some(verbIrregularityType =>
                activeIrregularityTypes.includes(verbIrregularityType)
            );
        } else {
            verbShouldBeSelectedByIrregularity = false;
        }
        verbButton.classList.toggle('selected', verbShouldBeSelectedByIrregularity);
    });

    updateVerbDropdownCount();
    updateDeselectAllButton();
    updateGroupButtons();
}
  function updateRanking() {
    rankingBox.innerHTML = '<h3>🏆 Top 5</h3>';
  
    db.collection("records")
      .where("mode", "==", selectedGameMode)
      .orderBy("score", "desc")
      .limit(10)
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          const entry = doc.data();
          rankingBox.innerHTML += `<div>${entry.name}: ${entry.score}</div>`;
        });
    })
    .catch((error) => {
      console.error("Error loading rankings:", error);
    });
  } 

  function updateScore() {
    scoreDisplay.innerHTML =
      `<strong>🎯 Score:</strong> ${score}`
      + `  <strong>🔥 Streak:</strong> ${streak}`
      + ` = <strong>×${multiplier.toFixed(1)}</strong>`;
    
    const maxStreakForFullFire = 15;
    const container = document.getElementById('score-container');
    const containerHeight = container.clientHeight;  
    const fireHeight = Math.min(
      (streak / maxStreakForFullFire) * containerHeight,
      containerHeight
    );
    flameEl.style.height = `${fireHeight}px`;
    flameEl.style.opacity = streak > 0 ? '1' : '0';

    const streakElement = document.getElementById('streak-display');
    if (streak >= 2 && streak <= 8) {
        streakElement.classList.add('vibrate');
    } else {
        streakElement.classList.remove('vibrate');
    }
}

let usedVerbs = [];  

	/*const pronounButtons = document.querySelectorAll('#pronoun-buttons .pronoun-group-button');
	const selectedPronouns = Array.from(pronounButtons)
	  .filter(btn => btn.classList.contains('selected'))
	  .map(btn => btn.getAttribute('data-pronoun'));
	const pronounsToShow = selectedPronouns.length > 0
	  ? selectedPronouns
	  : pronouns;*/
	configFlowScreen.style.display = 'flex'; 


        function handleInitialStart() {
                if (soundClick) soundClick.play(); 
                if (initialStartButton) {
                        initialStartButton.classList.add('selected');
                        setTimeout(() => initialStartButton.classList.remove('selected'), 1000);
                }
                navigateToStep('mode');
        }
	function handleInitialKeyPress(event) {
		if (event.key) { 
			 handleInitialStart();
		}
	}
	initialStartButton.addEventListener('click', handleInitialStart);
	document.addEventListener('keydown', handleInitialKeyPress);


	
	initStepButtons(gameModesContainer, 'mode');
	initStepButtons(difficultyButtonsContainer, 'difficulty');

	navigateToStep('splash'); 
function prepareNextQuestion() {
  const oldNote = document.getElementById('prize-note');
  if (oldNote) oldNote.remove();
  if (!allVerbData || allVerbData.length === 0) {
    console.error("No valid verb data.");
    feedback.textContent = "Error: Could not load verb data.";
    return;
  }

  const unusedVerbs = allVerbData.filter(v => !usedVerbs.includes(v.infinitive_es));
  if (unusedVerbs.length === 0) usedVerbs = [];
  const sourceArray = unusedVerbs.length > 0 ? unusedVerbs : allVerbData;

     const v = sourceArray[Math.floor(Math.random() * sourceArray.length)];
     if (!v || !v.conjugations || !v.infinitive_en) {
       console.error("Selected verb is invalid:", v);
       setTimeout(prepareNextQuestion, 50);
       return;
     }

     if (!usedVerbs.includes(v.infinitive_es)){
          usedVerbs.push(v.infinitive_es);
     }
     
   
   
   const selectedBtns = Array
     .from(document.querySelectorAll('.pronoun-group-button'))
     .filter(btn => btn.classList.contains('selected'));
 
   
   const allowedPronouns = selectedBtns.flatMap(btn =>
     JSON.parse(btn.dataset.values)
   );
 
   
   const pronList = allowedPronouns.length > 0
     ? allowedPronouns
     : pronouns;   
 
   
   const originalPronoun = pronList[
     Math.floor(Math.random() * pronList.length)
   ];
	  const displayPronoun = (function() {
		const map = {
		  él:       ['él','ella','usted'],
		  nosotros: ['nosotros','nosotras'],
		  ellos:    ['ellos','ellas','ustedes']
		};
		const arr = map[originalPronoun] || [originalPronoun];
		return arr[Math.floor(Math.random() * arr.length)];
	  })();
  const tKey = currentOptions.tenses[Math.floor(Math.random() * currentOptions.tenses.length)];
  const tenseObj = tenses.find(t => t.value === tKey);
  const tenseLabel = tenseObj ? tenseObj.name : tKey;

  const forms = v.conjugations[tKey];
  if (!forms) {
    console.error(`Missing conjugations for ${v.infinitive_es} in ${tKey}`);
    setTimeout(prepareNextQuestion, 50);
    return;
  }
  const correctES = forms[originalPronoun];
  if (!correctES) {
    console.error(`Missing ${originalPronoun} form for ${v.infinitive_es} in ${tKey}`);
    setTimeout(prepareNextQuestion, 50);
    return;
  }

  const rawEN = v.infinitive_en.toLowerCase();                   
  const expectedEN = rawEN
    .split(/\s*\/\s*/)                                           
    .map(s => s.replace(/^to\s+/, '').trim());                  

  currentQuestion = {
    verb: v,
    pronoun: originalPronoun,
    displayPronoun,
    answer: correctES,
    expectedEN,                                                  
    tenseKey: tKey,
    hintLevel: 0
  };
  startTime = Date.now();
  ansES.value = '';
  ansEN.value = '';
    isPrizeVerbActive = false; 
	qPrompt.classList.remove('prize-verb-active'); 

	if (selectedGameMode === 'lives' && (currentOptions.mode === 'productive_easy' || currentOptions.mode === 'productive')) {
	  let prizeChance = 0;
	  if (currentOptions.mode === 'productive_easy') { 
		prizeChance = 1/30;
	  } else if (currentOptions.mode === 'productive') { 
		prizeChance = 1/20;
	  }

	  const isVerbReflexive = currentQuestion.verb.infinitive_es.endsWith('se');
	  const typesForCurrentTense = currentQuestion.verb.types[currentQuestion.tenseKey] || [];
	  const isVerbIrregular = typesForCurrentTense.some(type => type !== 'regular') || typesForCurrentTense.length === 0; 

	  if (Math.random() < prizeChance && (isVerbIrregular || isVerbReflexive)) {
		isPrizeVerbActive = true;
		
		qPrompt.classList.add('prize-verb-active'); 
		 const prizeNote = document.createElement('div');
		 prizeNote.id = 'prize-note';
		 prizeNote.textContent = '🎁Lucky life if you conjugate this one correctly🎁!';
		 qPrompt.parentNode.insertBefore(prizeNote, qPrompt.nextSibling);
		
		console.log("VERBO PREMIO ACTIVADO!");
	  }
	}

  let promptText;
  if (currentOptions.mode === 'productive') {
     promptText = `<span class="tense-label">${tenseLabel}:</span> `
                + `"${v.infinitive_en}" – `
                + `<span class="pronoun" id="${displayPronoun}">${displayPronoun}</span>`;
    qPrompt.innerHTML = promptText;
    esContainer.style.display = 'block';
    enContainer.style.display = 'none';
    ansES.focus();
  } else if (currentOptions.mode === 'productive_easy') {
    promptText = `<span class="tense-label">${tenseLabel}:</span> `
               + `"${v.infinitive_es}" – `
               + `<span class="pronoun" id="${displayPronoun}">${displayPronoun}</span>`;
    qPrompt.innerHTML = promptText;
    esContainer.style.display = 'block';
    enContainer.style.display = 'none';
    ansES.focus();
  } else {
  
    promptText = `<span class="tense-label">${tenseLabel}:</span> `
               + `"${currentQuestion.answer}"`;
    qPrompt.innerHTML = promptText;
    esContainer.style.display = 'none';
    enContainer.style.display = 'block';
    ansEN.focus();
  }
}

function checkAnswer() {
  let possibleCorrectAnswers = [];
  const rt    = (Date.now() - startTime) / 1000;
  const bonus = Math.max(1, 2 - Math.max(0, rt - 5) * 0.1); 
  const irregularities = currentQuestion.verb.types[currentQuestion.tenseKey] || [];
  let correct  = false;
  let accentBonus = 0;
  const rawAnswerES = ansES.value.trim();
  let irregularBonus = 0;
  let reflexiveBonus  = 0;
  if (irregularities.length > 0 && !irregularities.includes('regular')) {
    irregularBonus = 10 * irregularities.length;  
  }
  
  const isReflexive = currentQuestion.verb.infinitive_es.endsWith('se');
  if (isReflexive && toggleReflexiveBtn && toggleReflexiveBtn.classList.contains('selected')) {
  reflexiveBonus = 10;
  }

  if (currentOptions.mode === 'productive' || currentOptions.mode === 'productive_easy') {
    let ans = ansES.value.trim().toLowerCase();
    let cor = currentQuestion.answer.toLowerCase();
    if (currentOptions.ignoreAccents) {
      ans = removeAccents(ans);
      cor = removeAccents(cor);
    }
    correct = ans === cor;

    if (correct && !currentOptions.ignoreAccents) {
      if (/[áéíóúÁÉÍÓÚ]/.test(currentQuestion.answer)) {
        accentBonus = 8; 
      }
    }
  } else {
    const ans = ansEN.value.trim().toLowerCase();
    const tense = currentQuestion.tenseKey;        
    const spanishForm = currentQuestion.answer;    
    const verbData = currentQuestion.verb;
	
    if (ans === '' && currentQuestion.hintLevel === 0) {
        feedback.innerHTML = `💡 The English infinitive is <strong>${verbData.infinitive_en}</strong>.`;
		timerTimeLeft = Math.max(0, timerTimeLeft - 3);
        currentQuestion.hintLevel = 1; 
        ansEN.focus();
        return; 
    }

    const allForms = verbData.conjugations[tense];
    if (!allForms) {
        console.error(`Modo Receptivo: Faltan conjugaciones para ${verbData.infinitive_es} en ${tense}`);
		timerTimeLeft = Math.max(0, timerTimeLeft - 3);
        feedback.innerHTML = "Error: Datos del verbo incompletos para esta pregunta.";
        return;
    }
    
    const spPronouns = Object
      .entries(allForms)
      .filter(([p, form]) =>
        pronouns.includes(p) && form === spanishForm
      )
      .map(([p]) => p);         
	const pronounGroupMap = {
	  yo:       ['I'],
	  tú:       ['you'],
	  él:       ['he','she','you'],
	  ella:     ['he','she','you'],
	  usted:    ['you'],      
	  nosotros: ['we'],
	  nosotras: ['we'],

	  vosotros: ['you all'],
	  vosotras: ['you all'],
	  ellos:    ['they','you all'],
	  ellas:    ['they','you all'],
	  ustedes:  ['you all']
	};

    const engProns = Array.from(new Set(
        spPronouns.flatMap(sp => pronounGroupMap[sp] || [])
    ));

    if (engProns.length === 0 && spPronouns.length > 0) {
        console.warn(`Modo Receptivo: No se mapearon pronombres ingleses para la forma '${spanishForm}' (pronombres ES: ${spPronouns.join(', ')}). Usando infinitivo como pista.`);
        if (ans !== '') { 
            timerTimeLeft = Math.max(0, timerTimeLeft - 3);
			feedback.innerHTML = `❌ Incorrecto. La pista es el infinitivo: <strong>${verbData.infinitive_en}</strong>.`;
            currentQuestion.hintLevel = 1;
            ansEN.value = '';
            ansEN.focus();
        }
        return;
    } else if (engProns.length === 0 && spPronouns.length === 0) {
       console.error(`Modo Receptivo: No se encontraron pronombres en español para la forma '<span class="math-inline">\{spanishForm\}' del verbo '</span>{verbData.infinitive_es}'.`);
       feedback.innerHTML = `Error: No se pudo procesar la pregunta. La pista es el infinitivo: <strong>${verbData.infinitive_en}</strong>.`;
       currentQuestion.hintLevel = 1;
       ansEN.value = '';
       ansEN.focus();
       return;
    }

	const formsForCurrentTenseEN = verbData.conjugations_en[tense];

	if (!formsForCurrentTenseEN) {
		console.error(`Receptive Mode: Missing ENGLISH conjugations for ${verbData.infinitive_en} in tense ${tense}`);
		feedback.innerHTML = `Error: English conjugation data is missing for the tense '${tense}'.`; 
		return;
	}

	possibleCorrectAnswers = engProns.flatMap(englishPronoun => {
	  
	  let formKey;
	  if (englishPronoun === 'I') {
		formKey = 'I';
	  } else if (englishPronoun === 'you all') {
		formKey = 'you';
	  } else {
		formKey = englishPronoun.toLowerCase();
	  }

	  
	  const verbEN = formsForCurrentTenseEN[formKey];
	  if (!verbEN) return [];

	  const base = verbEN.toLowerCase();

	  
	  return currentQuestion.expectedEN.flatMap(inf => {
		
		const parts = inf.split(' ');
		const suffix = parts.length > 1
		  ? ' ' + parts.slice(1).join(' ')
		  : '';
		
		if (englishPronoun === 'I') {
		  return [
			`I ${base}${suffix}`,
			`i ${base}${suffix}`
		  ];
		}
		if (englishPronoun === 'you all') {
		  return [`you all ${base}${suffix}`];
		}
		const pronLower = englishPronoun.toLowerCase();
		return [`${pronLower} ${base}${suffix}`];
	  });
	});

	if (possibleCorrectAnswers.length === 0 && engProns.length > 0) {
		console.error(`Receptive Mode: Could not form any English answers for ${verbData.infinitive_en} (tense: ${tense}) with English pronouns: ${engProns.join(', ')}. Check conjugations_en in verbos.json.`);
		feedback.innerHTML = `Error: No English conjugated forms found for the tense '${tense}'.`; 
		return;
	}

	correct = possibleCorrectAnswers.includes(ans);
}

  if (correct) { 
    
    if (soundCorrect) {
      soundCorrect.pause();
      soundCorrect.currentTime = 0;
      soundCorrect.play().catch(()=>{/* ignora errores por autoplay */});
    } 
	
    
    streak++;
    if (streak > bestStreak) bestStreak = streak;
    multiplier = Math.min(5, multiplier + 0.5);
    
    let basePoints = 10;  
    if (currentOptions.mode === 'receptive') {  
      basePoints = 5;  
    } else if (currentOptions.mode === 'productive') {  
      basePoints = 15;  
    }  
    multiplier = 1 + 0.1 * streak;
	
	const pts = Math.round(basePoints * multiplier * bonus)
			  + accentBonus
			  + irregularBonus
			  + reflexiveBonus;
	
    score += pts;
    let feedbackText = `✅ ¡Correcto!<br>Time: ${rt.toFixed(1)}s ×${bonus.toFixed(1)}`;
    if (accentBonus > 0) {
       feedbackText += ` +${accentBonus} accent bonus!`; 
    }
	
	let timeBonus;
	if (streak <= 2)       timeBonus = 5;
	else if (streak <= 4)  timeBonus = 6;
	else if (streak <= 6)  timeBonus = 7;
	else if (streak <= 8)  timeBonus = 8;
	else if (streak <= 10) timeBonus = 9;
	else                   timeBonus = 10;
	
	timerTimeLeft = Math.min(240, timerTimeLeft + timeBonus);
	showTimeChange(timeBonus);

    updateScore();
    setTimeout(prepareNextQuestion, 200);
	
    const irregularityEmojis = {
      "first_person_irregular": "🧏‍♀️",
      "stem_changing": "🌱",
      "multiple_irregularities": "🎭",
      "y_change": "➰",
      "irregular_root": "🌳",
      "stem_change_3rd_person": "🧍",
      "totally_irregular": "🤯",
      "irregular_participle": "🧩",
      "regular": "✅"
    };
    const irregularityNames = {
      "first_person_irregular": "First person",
      "stem_changing": "Stem change",
      "multiple_irregularities": "Multiple changes",
      "y_change": "Y change",
      "irregular_root": "Irregular root",
      "stem_change_3rd_person": "3rd person stem change",
      "totally_irregular": "Totally irregular",
      "irregular_participle": "Irregular participle",
      "regular": "Regular"
    };
   const irregularityDescriptions = irregularities
     .filter(type => type !== 'regular')
     .map(type => `${irregularityEmojis[type] || ''} ${type.replace(/_/g, ' ')}`)
     .join('<br>');
   
   if (selectedGameMode === 'lives') {
    
    totalCorrectAnswersForLife++; 

    if (totalCorrectAnswersForLife >= correctAnswersToNextLife) {
      remainingLives++;
      
      console.log("VIDA EXTRA por acumulación! Vidas:", remainingLives);
	  
      updateTotalCorrectForLifeDisplay();
      updateGameTitle();
      showLifeGainedAnimation(); 

      nextLifeIncrement++; 
      correctAnswersToNextLife += nextLifeIncrement; 
    }
    updateTotalCorrectForLifeDisplay(); 
    
	    
    currentStreakForLife++;
    if (currentStreakForLife >= streakGoalForLife) {
      remainingLives++;
      console.log("VIDA EXTRA por racha! Vidas:", remainingLives);
	  updateGameTitle();
	  updateStreakForLifeDisplay();
	  updateTotalCorrectForLifeDisplay();
      showLifeGainedAnimation();

      lastStreakGoalAchieved = streakGoalForLife; 
      streakGoalForLife += 2; 
      currentStreakForLife = 0;
	  updateGameTitle();
      updateStreakForLifeDisplay();
    }
    updateStreakForLifeDisplay();
	
    if (isPrizeVerbActive) {
      remainingLives++;
      
      console.log("VIDA EXTRA por VERBO PREMIO! Vidas:", remainingLives);
      showLifeGainedAnimation(true); 

      isPrizeVerbActive = false; 
      qPrompt.classList.remove('prize-verb-active'); 
    }
    
    }

	if (irregularBonus > 0) {
       feedbackText += `<br>+${irregularBonus} irregularity bonus!`;
       feedbackText += `<br><small>${irregularityDescriptions}</small>`;
    }
	
	if (reflexiveBonus > 0) {
  	  feedbackText += `<br>+${reflexiveBonus} 🧩reflexive bonus!`;
    }
	
	feedbackText += `<br>Points: ${pts}`;
    feedback.innerHTML = feedbackText;
    feedback.classList.add('vibrate'); 
	
    return;   
  } else {
    soundWrong.play();
    streak = 0;
    multiplier = 1.0;
	
    if (isPrizeVerbActive) {
      isPrizeVerbActive = false; 
      qPrompt.classList.remove('prize-verb-active'); 
    }
	
	timerTimeLeft = Math.max(0, timerTimeLeft - 3);
	showTimeChange(-3);
	
    if (selectedGameMode === 'lives') {
      remainingLives--;

	  currentStreakForLife = 0;


	  isPrizeVerbActive = false;
	  
	  updateTotalCorrectForLifeDisplay();
	  updateStreakForLifeDisplay();
	  
	  currentStreakForLife = 0;
      updateStreakForLifeDisplay();
    

	

       updateGameTitle();              
      if (remainingLives <= 0) {
        soundGameOver.play();  
		gameTitle.textContent = '💀 ¡Estás MUERTO!';
		checkButton.disabled = true;
        skipButton.disabled  = true;
		ansEN.disabled = true;
		ansES.disabled = true;

        if (name) {
		db.collection("records").add({
        name: name,
        score: score,
        mode: selectedGameMode,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
		tense: currentOptions.tenses,
		verb: currentQuestion.verb.infinitive_es,
		streak: bestStreak
      })
      .then(() => {
        console.log("Record saved online!");
		renderSetupRecords(); 
		quitToSettings();
      })
      .catch(error => console.error("Error saving record:", error));
	}
	   return; 

        }
      } else {
        updateGameTitle();
      }
    }
    updateScore();
		if (currentOptions.mode === 'receptive') {
		let hintMessage = `💡 The English infinitive is <strong>${currentQuestion.verb.infinitive_en}</strong>.`;
		if (possibleCorrectAnswers && possibleCorrectAnswers.length > 0) {
			const exampleAnswers = possibleCorrectAnswers.slice(0, Math.min(possibleCorrectAnswers.length, 3)).map(a => `'${a}'`);
		} else {
			hintMessage += `<br>Could not determine specific example answers. Check verb data.`;
		}

		feedback.innerHTML = hintMessage;
		ansEN.value = '';
		setTimeout(() => ansEN.focus(), 0);
		return;
	} else if (currentOptions.mode === 'productive' || currentOptions.mode === 'productive_easy') {
		
		if (currentQuestion.hintLevel === 0) {
			feedback.innerHTML =
			  `❌ Incorrect. <em>Clue 1:</em> infinitive is ` +
			  `<strong>${currentQuestion.verb.infinitive_es}</strong>.`; 
			currentQuestion.hintLevel = 1;
		} else if (currentQuestion.hintLevel === 1) {
			
			const conjTenseKey = currentQuestion.tenseKey;
			const conj = currentQuestion.verb.conjugations[conjTenseKey];
			const botones = Object.entries(conj || {}) 
				.filter(([pr]) => pr !== currentQuestion.pronoun)
				.map(([, form]) => `<span class="hint-btn">${form}</span>`)
				.join('');
			feedback.innerHTML =
				`❌ Incorrect. <em>Clue 2:</em> ` + botones;
			
		}
		ansES.value = '';
		setTimeout(() => ansES.focus(), 0);
	}
}
function startTimerMode() {
  document.getElementById('timer-container').style.display = 'flex';
  timerTimeLeft      = countdownTime;     
  totalPlayedSeconds = 0;
  document.getElementById('timer-clock').textContent   = `⏳ ${formatTime(timerTimeLeft)}`;
  document.getElementById('total-time').textContent    = `🏁 ${formatTime(totalPlayedSeconds)}`;
  document.getElementById('time-change').textContent   = '';  
  
  feedback.innerHTML = '';
  feedback.classList.remove('vibrate');
  score = 0; streak = 0; multiplier = 1.0;
  updateScore();
  configFlowScreen.style.display = 'none';
  gameScreen.style.display = 'block';
  updateGameTitle();
  soundStart.play();

  setTimeout(() => {
    menuMusic.pause();
    menuMusic.currentTime = 0;
    currentMusic = gameMusic;
    gameMusic.volume = 0;                
    gameMusic.play();

    musicToggle.style.display = 'block';
    volumeSlider.style.display = 'block';
    volumeSlider.value = targetVolume;
    volumeSlider.disabled = false;
  }, 3000);

  prepareNextQuestion();

	countdownTimer = setInterval(() => {
	  timerTimeLeft--;
	  totalPlayedSeconds++;
	document.getElementById('timer-clock').textContent  = `⏳ ${formatTime(timerTimeLeft)}`;
	document.getElementById('total-time').textContent   = `🏁 ${formatTime(totalPlayedSeconds)}`;


	  const clk = document.getElementById('timer-clock');
	  if (timerTimeLeft <= 10) {
		clk.style.color = '#ff4c4c';
		clk.style.transform = 'scale(1.1)';
	  } else {
		clk.style.color = 'white';
		clk.style.transform = 'scale(1)';
	  }

   if (timerTimeLeft <= 0) {
	  soundGameOver.play();
      clearInterval(countdownTimer);
  
      const name = prompt('⏱️ Time is up! Your name?');
      if (name) {
        db.collection("records").add({
          name: name,
          score: score,
          mode: selectedGameMode,
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
          tense: currentOptions.tenses,
          verb: currentQuestion.verb.infinitive_es,
          streak: bestStreak
        })
        .then(() => {
          console.log("Record saved online!");
          renderSetupRecords();
        })
        .catch(error => console.error("Error saving record:", error));
      }

      quitToSettings();
    }
  }, 1000);
}

function updateTotalCorrectForLifeDisplay() {
  const displayElement = document.getElementById('total-correct-for-life-display');
  if (displayElement && selectedGameMode === 'lives') {
    const needed = correctAnswersToNextLife - totalCorrectAnswersForLife;
    displayElement.textContent = `🎯 ${needed} to get 1❤️`;
  } else if (displayElement) {
    displayElement.textContent = ''; 
  }
}

function skipQuestion() {
	console.log('⏭ skipQuestion called');
	if (soundSkip) {
	  soundSkip
		.play()
		.then(() => console.log('🔈 skip sound played'))
		.catch(err => console.error('❌ skip sound error:', err));
	} else {
	  console.error('❌ soundSkip is undefined');
	}
    streak = 0;
    multiplier = 1.0;
    updateScore();
	timerTimeLeft = Math.max(0, timerTimeLeft - 3);
	showTimeChange(-3);
	
    let feedbackMessage;

    if (currentOptions.mode === 'receptive') {
		const tense = currentQuestion.tenseKey;
		const spanishForm = currentQuestion.answer;
		const verbData = currentQuestion.verb;

		const allFormsForTenseES = verbData.conjugations[tense];
		if (!allFormsForTenseES) {
			feedbackMessage = `⏭ Skipped. Error: Spanish verb data incomplete for tense '${tense}'. English Infinitive: <strong>${verbData.infinitive_en}</strong>`;
		} else {
			const spPronounsMatchingForm = Object.keys(allFormsForTenseES)
				.filter(p => allFormsForTenseES[p] === spanishForm);

			const pronounGroupMap = { /* ... your existing pronounGroupMap ... */
				yo: ['I'], tú: ['you'], él: ['he', 'she', 'you'], ella: ['he', 'she', 'you'],
				usted: ['you'], nosotros: ['we'], nosotras: ['we'], vosotros: ['you'],
				vosotras: ['you'], ellos: ['they', 'you'], ellas: ['they', 'you'], ustedes: ['you']
			};

			const engProns = Array.from(new Set(
				spPronounsMatchingForm.flatMap(sp => pronounGroupMap[sp] || [])
			));

			if (engProns.length > 0) {
				const formsForCurrentTenseEN_Skip = verbData.conjugations_en[tense];

				if (!formsForCurrentTenseEN_Skip) {
					feedbackMessage = `⏭ Skipped. Error: Missing ENGLISH conjugations for '${verbData.infinitive_en}' in tense '${tense}'. English Infinitive: <strong>${verbData.infinitive_en}</strong>`;
				} else {
					const expectedAnswersArray = engProns.flatMap(englishPronoun => {
						let formKey = englishPronoun.toLowerCase();
						if (englishPronoun === 'I') {
							formKey = 'I';
						}
						const conjugatedVerbEN = formsForCurrentTenseEN_Skip[formKey];
						if (conjugatedVerbEN) {
							return [`<strong>${englishPronoun.toLowerCase()} ${conjugatedVerbEN.toLowerCase()}</strong>`];
						}
						return [];
					});

					if (expectedAnswersArray.length > 0) {
						feedbackMessage = `⏭ Skipped. The correct answer was: ${expectedAnswersArray.join(' or ')}.`;
					} else {
						feedbackMessage = `⏭ Skipped. The English infinitive is <strong>${verbData.infinitive_en}</strong>. (Could not determine specific English conjugation for '${spanishForm}' in tense '${tense}')`;
					}
				}
			} else {
				feedbackMessage = `⏭ Skipped. The English infinitive is <strong>${verbData.infinitive_en}</strong>. (Could not determine English pronouns for '${spanishForm}')`;
			}
		}
	} else {
    
		const correctAnswer = currentQuestion.answer;
		feedbackMessage = `⏭ Skipped. The right conjugation was <strong>"${correctAnswer}"</strong>.`;
	}
	if (selectedGameMode === 'lives') {
		
		currentStreakForLife = 0;
		updateStreakForLifeDisplay();

		
		remainingLives--;
		updateGameTitle();
		updateTotalCorrectForLifeDisplay();

		
		if (remainingLives <= 0) {
		  soundGameOver.play();
		  gameTitle.textContent   = '💀¡Estás MUERTO!💀';
		  checkButton.disabled    = true;
		  skipButton.disabled     = true;
		  ansEN.disabled          = true;
		  ansES.disabled          = true;

		  if (name) {
			db.collection("records").add({
			  name: name,
			  score: score,
			  mode: selectedGameMode,
			  timestamp: firebase.firestore.FieldValue.serverTimestamp(),
			  tense: currentOptions.tenses,
			  verb: currentQuestion.verb.infinitive_es,
			  streak: bestStreak
			})
			.then(() => { renderSetupRecords(); quitToSettings(); })
			.catch(console.error);
		  }
		  return;  
		}
	  }

	  
	  setTimeout(prepareNextQuestion, 1500);
	}

function updateStreakForLifeDisplay() {
  const el = document.getElementById('streak-for-life-display');
  if (!el || selectedGameMode !== 'lives') {
    if (el) el.textContent = '';
    return;
  }

  
  const remaining = Math.max(streakGoalForLife - currentStreakForLife, 0);
  el.innerHTML = `🔥 <span class="math-inline">${remaining}</span> to get 1❤️`;
}

 function quitToSettings() {
  document.getElementById('timer-container').style.display = 'none';
  clearInterval(countdownTimer);
  gameMusic.pause();
  gameMusic.currentTime = 0;
  currentMusic = menuMusic;
  if (musicPlaying) {
    menuMusic.volume = targetVolume;
    menuMusic.play();
  }
  musicToggle.textContent = musicPlaying ? '🔊' : '🔇';
  musicToggle.style.display = 'none';
  volumeSlider.disabled = false;
  
    gameScreen.style.display = 'none';
    configFlowScreen.style.display = 'flex'; 
    

    
    selectedMode = null;
    selectedDifficulty = null;
    gameModesContainer.querySelectorAll('.config-flow-button').forEach(btn => {
        btn.classList.remove('confirmed-selection', 'provisional-selection');
        btn.disabled = false;
    });
    difficultyButtonsContainer.querySelectorAll('.config-flow-button').forEach(btn => {
        btn.classList.remove('confirmed-selection', 'provisional-selection');
        btn.disabled = false;
    });

    
    renderTenseButtons(); 
    initTenseDropdown(); 
    renderVerbButtons(); 
    initVerbDropdown();
    renderPronounButtons(); 
    initPronounDropdown();
    renderVerbTypeButtons(); 
    filterVerbTypes(); 

    const reflexBtn = document.getElementById('toggle-reflexive');
    if (reflexBtn) {
        reflexBtn.classList.remove('selected');
    }

    navigateToStep('splash'); 
    playHeaderIntro();
    checkFinalStartButtonState(); 
}
    updateRanking();
    remainingLives = 5;


finalStartGameButton.addEventListener('click', async () => {
    configFlowScreen.style.display = 'none'; 
    gameScreen.style.display = 'block'; 
    const selTenses = Array.from(
        document.querySelectorAll('#tense-buttons .tense-button.selected')
    ).map(btn => btn.dataset.value);

    
    if (!selectedMode || !selectedDifficulty) {
        alert('Please complete mode and difficulty selection.');
        return;
    }
    if (selTenses.length === 0) {
        alert('Please select at least one tense.');
        return;
    }
     
    const manuallySelectedVerbsCount = document.querySelectorAll('#verb-buttons .verb-button.selected').length;
    const selectedVerbTypesCount = document.querySelectorAll('.verb-type-button.selected:not(:disabled)').length;

    if (manuallySelectedVerbsCount === 0 && selectedVerbTypesCount === 0) {
        alert('Please select at least one verb type if no specific verbs are chosen.');
        return;
    }


    currentOptions = {
        mode: selectedDifficulty, 
        tenses: selTenses,
        ignoreAccents: document.getElementById('ignore-accents').checked
    };
    
    
    

    if (!await loadVerbs()) return; 

    
    configFlowScreen.style.display = 'none';
    gameScreen.style.display = 'block';
    
    
    feedback.innerHTML = '';
    feedback.classList.remove('vibrate');
    score = 0; streak = 0; multiplier = 1.0; bestStreak = 0; 
    updateScore();
    
    

    const livesMechanicsDisplay = document.getElementById('lives-mechanics-display');
    if (window.selectedGameMode === 'lives') { 
        livesMechanicsDisplay.style.display = 'block';
        remainingLives = 5;
        totalCorrectAnswersForLife = 0;
        currentStreakForLife = 0;
        nextLifeIncrement = 10; 
        correctAnswersToNextLife = 10; 
        streakGoalForLife = 5; 
        lastStreakGoalAchieved = 0;
        updateTotalCorrectForLifeDisplay();
        updateStreakForLifeDisplay();
    } else {
        livesMechanicsDisplay.style.display = 'none';
    }
    updateGameTitle(); 

    if (window.selectedGameMode === 'timer') {
        
        startTimerMode(); 
    } else {
        soundStart.play();
        setTimeout(() => {
            if (currentMusic !== gameMusic) {
                menuMusic.pause();
                menuMusic.currentTime = 0;
                currentMusic = gameMusic;
            }
            if (gameMusic.paused && musicPlaying) {
                gameMusic.volume = targetVolume;
                gameMusic.play();
            }
            musicToggle.style.display = 'block';
            volumeSlider.style.display = 'block';
            volumeSlider.value = targetVolume; 
            volumeSlider.disabled = gameMusic.paused;
        }, 1000); 
        prepareNextQuestion();
    }
}); 

function checkFinalStartButtonState() {
    const selTenses = document.querySelectorAll('#tense-buttons .tense-button.selected').length;
    const manuallySelectedVerbs = document.querySelectorAll('#verb-buttons .verb-button.selected').length;
    const selectedVerbTypes = document.querySelectorAll('.verb-type-button.selected:not(:disabled)').length;
    let 조건 = false;

    if (manuallySelectedVerbs > 0) { 
        조건 = selTenses > 0;
    } else { 
        조건 = selTenses > 0 && selectedVerbTypes > 0;
    }

    finalStartGameButton.disabled = !조건;
    if (!조건 && finalStartGameButton.title !== "Please select tenses and verb types/specific verbs.") {
        finalStartGameButton.title = "Please select tenses and verb types/specific verbs.";
    } else if (조건) {
        finalStartGameButton.title = "";
    }
}
	document.getElementById('tense-buttons').addEventListener('click', checkFinalStartButtonState);
	document.getElementById('verb-buttons').addEventListener('click', checkFinalStartButtonState);
	document.getElementById('verb-type-buttons').addEventListener('click', checkFinalStartButtonState);

    
    
    const checkButton  = document.getElementById('check-button'); 
    const skipButton   = document.getElementById('skip-button');   
    const endButton    = document.getElementById('end-button');
    const ansES        = document.getElementById('answer-input-es');
    const ansEN        = document.getElementById('answer-input-en');
    

    if (checkButton) checkButton.addEventListener('click', checkAnswer);
    if (skipButton) skipButton.addEventListener('click', skipQuestion);
    if (endButton) {
        endButton.addEventListener('click', () => {
            const name = prompt('¿Cómo te llamas?'); 
            if (name) {
                const recordData = {
                    name: name,
                    score: score,
                    mode: selectedGameMode, 
                    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                    tense: currentOptions.tenses, 
                    verb: currentQuestion.verb.infinitive_es, 
                    streak: bestStreak 
                };
                console.log("Intentando guardar este récord (endButton):", JSON.stringify(recordData, null, 2));
                db.collection("records").add(recordData)
                  .then(() => {
                    console.log("Record saved online!");
                    renderSetupRecords(); 
                  })
                  .catch(error => {
                    console.error("Error saving record (endButton):", error);
                  });
            }
            quitToSettings(); 
        });
    }

    if (ansES) ansES.addEventListener('keypress', e => { if (e.key === 'Enter') checkAnswer(); });
    if (ansEN) ansEN.addEventListener('keypress', e => { if (e.key === 'Enter') checkAnswer(); });
function renderVerbTypeButtons() {
  const container = document.getElementById('verb-type-buttons');
  container.innerHTML = ''; 

  irregularityTypes.forEach(type => { 
    const button = document.createElement('button');
    
    button.type = 'button'; 
    button.classList.add('verb-type-button');
    button.dataset.value = type.value; 
    button.dataset.times = type.times.join(',');
    button.innerHTML = `
      <span class="verb-type-name">${type.name}</span>
      ${type.hint ? `<br><span class="verb-type-hint">${type.hint}</span>` : ''}
    `; 

    
    if (type.value === 'regular') {
      button.classList.add('selected');
    }

    
    button.addEventListener('click', () => { 
      if (soundClick) soundClick.play();
      
      button.classList.toggle('selected'); 
      const isNowSelected = button.classList.contains('selected');

      
      const currentSelectedTenses = getSelectedTenses();
      if (currentSelectedTenses.includes('present')) {
        const multipleIrrBtn = document.querySelector('.verb-type-button[data-value="multiple_irregularities"]');
        if (multipleIrrBtn && multipleIrrBtn.classList.contains('selected')) { 
          const irregularRootDef = irregularityTypes.find(it => it.value === 'irregular_root');
          const irregularRootAppliesToPresent = irregularRootDef ? irregularRootDef.times.includes('present') : false;
          
          if ((button.dataset.value === 'first_person_irregular' || 
              (button.dataset.value === 'irregular_root' && irregularRootAppliesToPresent)) && 
              !isNowSelected) { 
            console.log(`Deseleccionando 'multiple_irregularities' por dependencia con ${button.dataset.value}`);
            multipleIrrBtn.classList.remove('selected');
          }
        }
      }
      
		console.log(`Clic en tipo irregular: ${button.dataset.value}, ahora seleccionado: ${isNowSelected}`);
		console.log("Listener de Tipo Irregular -> llamando a applyIrregularityAndTenseFiltersToVerbList");
		applyIrregularityAndTenseFiltersToVerbList(); 
        updateVerbTypeButtonsVisualState(); 
    });

    container.appendChild(button);
  });
}

const specificModal = document.getElementById('specific-info-modal');
const specificModalBackdrop = document.getElementById('specific-modal-backdrop');
const specificModalContent = specificModal.querySelector('.specific-modal-content');
const closeSpecificModalBtn = document.getElementById('close-specific-modal-btn');



const specificInfoData = {
  infiniteMode: {
    title: "♾️ Infinite Mode",
    html: `<p>Play without time or life limits. Ideal for practicing at your own pace.</p>
           <p><strong class="modal-subtitle">Goal:</strong> Achieve the highest score and longest streak possible!</p>
           <p><strong class="modal-subtitle">Bonuses:</strong> Awarded for speed and accuracy.</p>`
  },
  timerMode: {
    title: "⏱️ Timer Mode (4 Minutes)",
    html: `You have <strong>4 minutes</strong> to score as many points as possible.<br>
           <strong class="modal-subtitle">Time Mechanics:</strong><br>
           - Start with 4:00 minutes.<br>
           - Correct answers ✅ add time based on your streak (<span class="emphasis-mechanic">+5s to +10s</span>). Max time is 4:00.<br>
           - Incorrect/Skipped answers ❌ deduct <span class="emphasis-mechanic">3 seconds</span>.<br><br>
           <strong class="modal-subtitle">Time UI:</strong><br>
           - ⏳ Remaining Time: Main clock (turns <span class="text-red">red</span> and pulses in the last 10s).<br>
           - ➕➖ Time Change: Brief notes like "<span class="text-green">+5s</span>" or "<span class="text-red">-3s</span>".<br>
           - 🏁 Total Time Played: Shows your current session duration.<br><br>
           <strong class="modal-subtitle">Scoring Bonuses (per question):</strong><br>
           - Streak Bonus: Multiplies points for consecutive correct answers.<br>
           - Speed Bonus: Answering in under 5 seconds gives an additional score multiplier (up to <span class="points-value">x2.0</span>).<br><br>
           <strong class="modal-subtitle">Goal:</strong> Maximize your score before time runs out!`
  },
  livesMode: {
    title: "💖 Lives Mode",
    html: `Survive as long as you can! You start with <strong>5 lives</strong> (❤️).<br>
           Each incorrect or skipped answer costs one life.<br><br>
           <strong class="modal-subtitle">Gaining Extra Lives:</strong><br>
           1. <strong>Accumulated Correct Answers:</strong> Earn a life by getting a specific total number of correct answers (e.g., <code>🎯 X to get 1❤️</code>). The target increases each time.<br>
           2. <strong>Streaks:</strong> Achieve specific streaks of consecutive correct answers (e.g., <code>🔥 Y in a row for 1❤️</code>). This target also increases.<br>
           3. <strong class="emphasis-mechanic">🎁 Prize Verbs:</strong>
              - Appear randomly in "<span class="difficulty-normal">Conjugate</span>" (⚙️) and "<span class="difficulty-hard">Produce</span>" (⌨️) difficulties if the verb is irregular or reflexive.<br>
              - Chance: Approx. <span class="emphasis-mechanic">1 in 30</span> for "Conjugate", approx. <span class="emphasis-mechanic">1 in 20</span> for "Produce".<br>
              - Correctly conjugating a prize verb (marked with 🎁) grants an <span class="emphasis-mechanic">extra life!</span><br>
           <br><strong class="modal-subtitle">Goal:</strong> Stay alive and get the highest score!`
  },
  receptiveConfig: {
    title: "💭 Recall Mode",
    html: `<strong>Difficulty:</strong> <span class="difficulty-easy">Easy to Medium</span><br>
           You'll see a conjugated Spanish verb and its tense. Your task is to provide the correct <strong>English subject pronoun AND the conjugated English verb</strong>.<br><br>
           <strong class="modal-subtitle">Quick Tense Translation Guide (Spanish to English):</strong><br>
             <li><strong>Present (Presente):</strong> Usually like "<span class="tense-example">I eat</span>", "<span class="tense-example">he eats</span>".</li>
             <li><strong>Simple Past (Pretérito):</strong> Usually "<span class="tense-example">I ate</span>", "<span class="tense-example">he ate</span>".</li>
             <li><strong>Present Perfect (Pret. Perfecto):</strong> "<span class="tense-example">I have eaten</span>", "<span class="tense-example">he has eaten</span>".</li>
             <li><strong>Imperfect (Imperfecto):</strong> Often "<span class="tense-example">I was eating</span>" (ongoing past) or "<span class="tense-example">I used to eat</span>" (habitual past). Context is key!</li>
             <li><strong>Future (Futuro):</strong> "<span class="tense-example">I will eat</span>", "<span class="tense-example">he will eat</span>".</li>
             <li><strong>Conditional (Condicional):</strong> "<span class="tense-example">I would eat</span>", "<span class="tense-example">he would eat</span>".</li>
           </ul>
           <em>Example:</em> <span class="example-prompt-text">SIMPLE PAST: comí</span> You type:
           <div class="typing-animation-container"><div class="typing-animation" id="recall-example-anim"></div></div>
           <strong>Base Points:</strong> <span class="points-value">+5</span> per correct answer.<br>
           While this is the easiest mode, translation can be tricky! Some Spanish verbs don't have a single, direct English equivalent, and tenses can translate in multiple ways.`
  },
  productiveEasyConfig: {
    title: "⚙️ Conjugate Mode",
    html: `<strong>Difficulty:</strong> <span class="difficulty-normal">Normal</span><br>
           This mode is a direct test of your Spanish conjugation skills. You'll be given a Spanish verb infinitive, a Spanish pronoun, and the tense.<br><br>
           Your mission is to type the correctly conjugated Spanish verb form. Focus on standard conjugation rules and irregularities.<br>
           <em>Example:</em> <span class="example-prompt-text">Presente: conjugar – nosotros</span> You type:
           <div class="typing-animation-container"><div class="typing-animation" id="conjugate-example-anim"></div></div>
           <strong>Base Points:</strong> <span class="points-value">+10</span> per correct answer.<br>
           <strong class="emphasis-mechanic">💖 Lives Mode Bonus:</strong> When playing in "Lives Mode", irregular or reflexive verbs in "Conjugate" have a <span class="emphasis-mechanic">~1 in 30</span> chance of being a 🎁 Prize Verb for an extra life!`
  },
  productiveConfig: {
    title: "⌨️ Produce Mode",
    html: `<strong>Difficulty:</strong> <span class="difficulty-hard">Hard</span><br>
           The most challenging mode! You'll get an English verb infinitive, a Spanish pronoun, and the tense.<br><br>
           You need to:<br>
             <li>Know the correct Spanish infinitive for the English verb.</li>
             <li>Correctly conjugate that Spanish verb according to the pronoun and tense, including irregularities.</li>
           </ol>
           This truly tests your ability to think in Spanish.<br>
           <em>Example:</em> <span class="example-prompt-text">Present: to love – yo</span> You type:
           <div class="typing-animation-container"><div class="typing-animation" id="produce-example-anim"></div></div>
           <strong>Base Points:</strong> <span class="points-value">+15</span> per correct answer.<br>
           <strong class="emphasis-mechanic">💖 Lives Mode Bonus:</strong> When playing in "Lives Mode", irregular or reflexive verbs in "Produce" have a <span class="emphasis-mechanic">~1 in 20</span> chance of being a 🎁 Prize Verb for an extra life!`
  },
};

function openSpecificModal(infoKey) {
  const info = specificInfoData[infoKey];
  if (info && specificModal && specificModalContent && specificModalBackdrop) {
    specificModalContent.innerHTML = `<h2>${info.title}</h2>${info.html}`;
    specificModal.style.display = 'flex';
    specificModalBackdrop.style.display = 'block';
    document.body.classList.add('tooltip-open-no-scroll');

    
    if (window.typeInterval) clearInterval(window.typeInterval);
    
    
    const recallAnim = specificModalContent.querySelector('#recall-example-anim');
    const conjugateAnim = specificModalContent.querySelector('#conjugate-example-anim');
    const produceAnim = specificModalContent.querySelector('#produce-example-anim');

    if (recallAnim) setTimeout(() => typeWriter(recallAnim, 'I ate', 150), 50);
    if (conjugateAnim) setTimeout(() => typeWriter(conjugateAnim, 'conjugamos', 150), 50);
    if (produceAnim) setTimeout(() => typeWriter(produceAnim, 'amo', 150), 50);

  } else {
    console.warn('Modal, content area, backdrop not found, or infoKey invalid:', infoKey);
  }
}

function closeSpecificModal() {
  if (specificModal && specificModalBackdrop) {
    specificModal.style.display = 'none';
    specificModalBackdrop.style.display = 'none';
    document.body.classList.remove('tooltip-open-no-scroll');
  }
}

const infoIcons = document.querySelectorAll('.context-info-icon');
infoIcons.forEach(icon => {
  icon.addEventListener('click', function() {
    if (typeof soundClick !== 'undefined') soundClick.play();
    const infoKey = this.dataset.infoKey;
    openSpecificModal(infoKey);
  });
});

if (closeSpecificModalBtn) {
  closeSpecificModalBtn.addEventListener('click', closeSpecificModal);
}
if (specificModalBackdrop) {
  specificModalBackdrop.addEventListener('click', closeSpecificModal);
}

function updateGameTitle() {
  const modeLabels = {
    'infinite':   'Infinite',
    'timer':      'Timer 4m',
    'lives':      'Lives',
    'receptive':  'Recall',
    'productive_easy': 'Conjugate',
    'productive': 'Produce'
  };

  
  const tm = currentOptions.tenses
    .map(t => t.replace('_', ' '))
    .join(', ');

  
  const displayMode = modeLabels[currentOptions.mode] || currentOptions.mode;

  
  let html = `Mode: ${displayMode}<br>`;
  html += `Tenses: ${tm}`;

  
  if (selectedGameMode === 'lives') {
    html += `<br><span id="lives-count" style="font-size: 1.5em; vertical-align: middle;">${remainingLives}</span><img src="images/heart.png" alt="life" style="width:40px; height:40px; vertical-align: middle; margin-left: 6px;">`;
  }

  
  gameTitle.innerHTML = html;
}

function typewriterEffect(textElement, text, interval) {
  let index = 0;
  const typeInterval = setInterval(() => {
    textElement.textContent += text[index];
    index++;
    if (index === text.length) {
      clearInterval(typeInterval);
    }
  }, interval);
}


	if (helpButton && tooltip) {
		helpButton.addEventListener('click', function(event) { 
			event.stopPropagation(); 

                        if (tooltip.style.display === 'block') {
                                tooltip.style.display = 'none';
                                document.body.classList.remove('tooltip-open-no-scroll');
                                if (typeInterval) clearInterval(typeInterval); 
                                helpButton.classList.remove('selected');
                        } else {
                                const tooltipContentHTML = `
                                        <div class="tooltip-content-wrapper">
						<div class="tooltip-row">
							<div class="tooltip-box">
								<h5>♾️ Infinite </h5>
								<p>Play without time or life limits. Aim for the highest score and longest streak!</p>
							</div>
							<div class="tooltip-box">
								<h5>⏱️ Timer</h5>
								<p>Score as many points as possible within the 4-minute time limit.</p>
							</div>
							<div class="tooltip-box">
								<h5>💖 Lives</h5>
								<p>You have 5 lives. Each incorrect answer costs one life. Survive as long as you can!</p>
							</div>
						</div>
						<div class="tooltip-row">
							<div class="tooltip-box">
								<h5>💭 Recall</h5>
								<p>EASY - Given a Spanish tense and conjugation, type the English pronoun and <strong>base verb in present tense</strong>.</p><p><strong>Base points:</strong> +5</p>
								<div class="example-prompt">"SIMPLE PAST: recordé"</div>
								<div class="typing-animation" id="recall-anim"></div>
							</div>
							<div class="tooltip-box">
								<h5>⚙️ Conjugate</h5>
								<p>NORMAL - Given a Spanish verb and pronoun, type the correct conjugated form in Spanish.</p><p><strong>Base points:</strong> +10</p>
								<div class="example-prompt">"conjugar – nosotros"</div>
								<div class="typing-animation" id="easy-anim"></div>
							</div>
							<div class="tooltip-box">
								<h5>⌨️ Produce</h5>
								<p>HARD - Given the English verb and a Spanish pronoun, type the correct conjugation in Spanish.</p><p><strong>Base points:</strong> +15</p>
								<div class="example-prompt">"Present: to love – yo"</div>
								<div class="typing-animation" id="produce-anim"></div>
							</div>
						</div>
					</div>
					<button id="close-tooltip-btn" style="margin-top: 15px; background-color: var(--accent-color-blue); color: #333;">Close Help</button>
				`;
                                tooltip.innerHTML = tooltipContentHTML;
                                tooltip.style.display = 'block';
                                document.body.classList.add('tooltip-open-no-scroll'); 
                                helpButton.classList.add('selected');

				
				const produceAnimElement = document.getElementById('produce-anim');
				const recallAnimElement = document.getElementById('recall-anim');
				const easyAnimElement = document.getElementById('easy-anim');

				if (produceAnimElement) setTimeout(() => typeWriter(produceAnimElement, 'amo', 150), 50);
				if (recallAnimElement) setTimeout(() => typeWriter(recallAnimElement, 'I remember', 150), 50);
				if (easyAnimElement) setTimeout(() => typeWriter(easyAnimElement, 'conjugamos', 150), 50);

				
				const closeTooltipBtn = document.getElementById('close-tooltip-btn');
				if (closeTooltipBtn) {
					closeTooltipBtn.addEventListener('click', () => {
						tooltip.style.display = 'none';
						document.body.classList.remove('tooltip-open-no-scroll');
						if (typeInterval) clearInterval(typeInterval);
					});
				}
			}
		});

		
		document.addEventListener('click', function(event) {
			if (tooltip.style.display === 'block' && !tooltip.contains(event.target) && event.target !== helpButton && !helpButton.contains(event.target)) {
				tooltip.style.display = 'none';
				document.body.classList.remove('tooltip-open-no-scroll');
				if (typeInterval) clearInterval(typeInterval);
			}
		});

		
		tooltip.addEventListener('wheel', function(event) {
			
			if (this.scrollHeight > this.clientHeight) { 
				 if ((this.scrollTop === 0 && event.deltaY < 0) || (this.scrollTop + this.clientHeight === this.scrollHeight && event.deltaY > 0)) {
					
				 } else {
					event.stopPropagation();
				 }
			}
		});
		tooltip.addEventListener('touchmove', function(event) {
			
			if (this.scrollHeight > this.clientHeight) {
				event.stopPropagation();
			}
		});

	} else {
		console.error("Help button (?) or tooltip container (#tooltip) not found.");
	}

const leftBubbles = document.getElementById('left-bubbles');
const rightBubbles = document.getElementById('right-bubbles');
let bubblesActive = false;
let leftBubbleInterval, rightBubbleInterval;

function showLifeGainedAnimation() {
	
  
  if (soundLifeGained) {
    try {
      soundLifeGained.currentTime = 0;
      const playPromise = soundLifeGained.play();
      if (playPromise && typeof playPromise.then === 'function') {
        playPromise
          .then(() => console.log('🔊 soundLifeGained.play() OK'))
          .catch(err => console.warn('⚠️ Error al reproducir sonido:', err));
      }
    } catch (e) {
      console.error('⚠️ Excepción al reproducir sonido:', e);
    }
  } else {
    console.warn('⚠️ soundLifeGained es null o undefined');
  }
  
  
  const livesEl = document.getElementById('lives-count');
  console.log('❤️ Preparando pop en:', livesEl);
  if (livesEl) {
    livesEl.classList.add('just-gained');
    livesEl.addEventListener('animationend', () => {
      livesEl.classList.remove('just-gained');
    }, { once: true });
  }

  
  const canvas = document.getElementById('life-confetti-canvas');
  console.log('🎨 Canvas encontrado:', canvas);
  if (!canvas) return;
  
  canvas.style.display = 'block';
  console.log('🎨 Canvas style after display:', getComputedStyle(canvas).display);

  
  const ctx  = canvas.getContext('2d');
  const rect = canvas.getBoundingClientRect();
  canvas.width  = rect.width;
  canvas.height = rect.height;
  console.log('🎨 Canvas tamaño de backing:', canvas.width, canvas.height);

  
  const particles = [];
  const total     = 80;
  const colors    = ['#ff5e5e', '#ffb3b3', '#ffe2e2', 'lightgreen', '#90ee90']; 
    
	function drawHeart(x, y, size, color) {
    ctx.save();
    ctx.fillStyle = color;
    ctx.beginPath();
    const topY = y - size / 3;
    ctx.moveTo(x, topY);
    ctx.bezierCurveTo(x, y - size, x - size, y - size/3, x, y + size);
    ctx.bezierCurveTo(x + size, y - size/3, x, y - size, x, topY);
    ctx.fill();
    ctx.restore();
  }

  for (let i = 0; i < total; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: canvas.height + Math.random() * 50, 
      vx: Math.random() * 8 + 2,              
      vy: -Math.random() * 15 - 8,    
      size: Math.random() * 10 + 5,           
      color: colors[Math.floor(Math.random() * colors.length)],
      shape: Math.random() < 0.5 ? 'heart' : 'square', 
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 5
    });
  }

  let start = null;
  function animate(ts){
    if(!start) start = ts;
    const elapsed = ts - start;
    ctx.clearRect(0,0,canvas.width,canvas.height);
    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.12; 
      p.rotation += p.rotationSpeed;
      if(p.shape==='heart'){
        drawHeart(p.x,p.y,p.size,p.color);
      } else {
        ctx.fillStyle = p.color;
        ctx.fillRect(p.x,p.y,p.size,p.size);
      }
    });
    if(elapsed < 2500){
      requestAnimationFrame(animate);
    } else {
      ctx.clearRect(0,0,canvas.width,canvas.height);
      canvas.style.display = 'none';
      console.log('🎨 Animación terminada y canvas oculto');
    }
  }
  requestAnimationFrame(animate);
}


  if (specificModal) specificModal.style.display = 'none';
  if (specificModalBackdrop) specificModalBackdrop.style.display = 'none';

  const generalTooltip = document.getElementById('tooltip'); 
  const generalBackdrop = document.querySelector('.modal-backdrop'); 

  if (generalTooltip) generalTooltip.style.display = 'none';
  if (generalBackdrop) generalBackdrop.style.display = 'none';
  
function startBubbles() {
  if (bubblesActive) return;   
  bubblesActive = true;
  leftBubbleInterval = setInterval(() => {
    createBubble('left');
  }, 1800);
  rightBubbleInterval = setInterval(() => {
    createBubble('right');
  }, 2100);
}

function stopBubbles() {
  bubblesActive = false;
  clearInterval(leftBubbleInterval);
  clearInterval(rightBubbleInterval);
  leftBubbles.innerHTML  = '';
  rightBubbles.innerHTML = '';
}

function createBubble(side) {
  const bubble = document.createElement('div');
  bubble.classList.add('bubble');

  const verb = allVerbData[Math.floor(Math.random() * allVerbData.length)];
  if (!verb) return;

  const availableTenseValues = tenses.map(t => t.value);
  const tense = availableTenseValues[Math.floor(Math.random() * availableTenseValues.length)];
  const pronoun = Object.keys(verb.conjugations[tense] || {})[Math.floor(Math.random() * 6)];
  const conjugation = verb.conjugations[tense]?.[pronoun];

  bubble.textContent = conjugation || verb.infinitive_es;

  bubble.style.left = Math.random() * 70 + 'px'; 
  bubble.style.fontSize = (Math.random() * 6 + 14) + 'px'; 

  const container = side === 'left' ? leftBubbles : rightBubbles;
  container.appendChild(bubble);
  bubble.addEventListener('click', () => {
  
  soundbubblepop.currentTime = 0;
  soundbubblepop.play();

  
  bubble.remove();
  });
}

window.addEventListener('resize', () => {
  if (window.innerWidth <= 1200) {
    stopBubbles();
  } else {
    startBubbles();
  }
});
if (window.innerWidth > 1200) startBubbles();
  document.body.classList.remove('is-loading'); 

  if (specificModal) specificModal.style.display = 'none';
  if (specificModalBackdrop) specificModalBackdrop.style.display = 'none';
  
  const generalTooltipForHiding = document.getElementById('tooltip');
  const generalBackdropForHiding = document.querySelector('.modal-backdrop:not(.specific-modal-backdrop)');

  if (generalTooltipForHiding) generalTooltipForHiding.style.display = 'none';
  if (generalBackdropForHiding) generalBackdropForHiding.style.display = 'none';

});                     


