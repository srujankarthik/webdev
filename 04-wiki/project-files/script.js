/**
 * STEPS:
 *
 * 1. Extract all selectors, create helper functions
 * 2. Read through the API's documentation and understand what needs to be included in the params of the request,
 *    create a generic params object
 * 3. Register event listeners, fetch the data per the user's input
 * 4. Output results to the UI (success and error)
 * 5. Adjust UI states accordingly
 */

const submitBtn = document.querySelector('#submit');
const inputField = document.querySelector('#input');
const error = document.querySelector('#error');
const results = document.querySelector('#results');

const URL = 'https://en.wikipedia.org/w/api.php?';
const params = {
    origin: '*',
    format: 'json',
    action: 'query',
    prop: 'extracts', // returns plain text
    exchars: 250, // returns characters, int value b/w 1 to 1200
    exintro: true, // returns content before first section
    generator: 'search', // performs a full text search
    gsrlimit: 20, // no of pages to return
};

const disableUI = () => {
    inputField.disabled = true;
    submitBtn.disabled = true;
};

const enableUI = () => {
    inputField.disabled = false;
    submitBtn.disabled = false;
};

const clearPreviousResults = () => {
    error.innerHTML = '';
    results.innerHTML = '';
};

const isInputEmpty = inputField => {
    if (!inputField || inputField === '') {
        return true;
    }
    return false;
};

const showError = err => {
    error.innerHTML = `${err}`;
};

const showResults = allResults => {
    allResults.forEach(result => {
        results.innerHTML += `
            <div class="results__item">
            <a href="https://en.wikipedia.org/?curid=${result.pageId}" target="_blank" class="card animated bounceInUp">
                <h2 class="results__item__title">${result.title}</h2>
                <p class="results__item__intro">${result.intro}</p>
            </a>
        </div>
        `;
    });
};

const gatherData = pages => {
    const results = Object.values(pages).map(page => ({
        pageId: page.pageid,
        title: page.title,
        intro: page.extract,
    }));
    showResults(results);
};

const getData = async () => {
    const userInput = inputField.value;
    if (isInputEmpty(userInput)) return;

    params.gsrsearch = userInput;
    clearPreviousResults();
    disableUI();

    try {
        const { data } = await axios.get(URL, { params });
        if (data.error) throw new Error(data.error.info);
        gatherData(data.query.pages);
    } catch (error) {
        showError(error);
    } finally {
        enableUI();
    }
};

const handleKeyEvent = e => {
    if (e.key === 'Enter') {
        getData();
    }
};

const registerEventHandlers = () => {
    inputField.addEventListener('keydown', handleKeyEvent);
    submitBtn.addEventListener('click', getData);
};

registerEventHandlers();
