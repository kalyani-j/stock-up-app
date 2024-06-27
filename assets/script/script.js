// Function to search a Ticker's Company Profile
const stockSearch = async () => {
  const tickerName = document.getElementById('stock-search').value;
  //   console.log(stockSearch, 'ss');

  let compProfile = document.getElementById('company-profile');
  compProfile.setAttribute('style', 'display: flex');

  getQuote(tickerName);
  addSearchHistory(tickerName);
  /**
   * Company Profile: Fetch ticker details from Finnhub
   * Reference: https://finnhub.io/docs/api/company-profile2
   *  */
  let fetchStockDetails = await fetch(
    `https://finnhub.io/api/v1/stock/profile2?symbol=${tickerName}&token=cpqk53pr01qo647np200cpqk53pr01qo647np20g`
  );
  // console.log(fetchStockDetails)
  let stockData = await fetchStockDetails.json();
  console.log(stockData);

  let stockName = document.getElementById('stock-name');
  stockName.textContent = ` ${stockData.name}`;

  let ticker = document.getElementById('stock-symbol');
  ticker.textContent = ` ${stockData.ticker}`;

  let tickerLogo = document.getElementById('logo-img');
  tickerLogo.src = `${stockData.logo}`;

  let website = document.getElementById('ticker-website');
  website.textContent = `Website: ${stockData.weburl}`;
  //  TO DO: Add URL to the website

  let phone = document.getElementById('ticker-phone');
  phone.textContent = `Phone: ${stockData.phone
    .replace(/\D+/g, '')
    .replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3')}`;

  let marketCap = document.getElementById('market-capitalization');
  marketCap.textContent = `Market Captialization: ${stockData.currency} ${stockData.marketCapitalization}`;

  let shares = document.getElementById('shares-outstanding');
  shares.textContent = `Outstanding Shares: ${stockData.shareOutstanding}`;

  let exchange = document.getElementById('stock-exchange');
  exchange.textContent = `Stock Exchange: ${stockData.exchange.toUpperCase()})`;

  let country = document.getElementById('ticker-country');
  country.textContent = `Country: ${stockData.country}`;

  let currency = document.getElementById('ticker-currency');
  currency.textContent = `Currency: ${stockData.currency}`;
};

// Function to get Stock Quote
const getQuote = async (tickerName) => {
  console.log('ticker in getQuote', tickerName);

  let stockQuote = await fetch(
    `https://finnhub.io/api/v1/quote?symbol=${tickerName}&token=cpqk53pr01qo647np200cpqk53pr01qo647np20g`
  );
  // console.log(stockQuote);

  let quoteData = await stockQuote.json();
  console.log(quoteData);

  const currentPrice = document.getElementById('current-price');
  currentPrice.textContent = `Current Price: ${quoteData.c}`;

  const change = document.getElementById('change');
  change.textContent = `Change: ${quoteData.d}`;

  const pctChange = document.getElementById('percent-change');
  pctChange.textContent = `Percent Change: ${quoteData.dp}%`;

  const highPrice = document.getElementById('high-price');
  highPrice.textContent = `High: ${quoteData.h}`;

  const lowPrice = document.getElementById('low-price');
  lowPrice.textContent = `Low: ${quoteData.l}`;

  const openPrice = document.getElementById('open-price');
  openPrice.textContent = `Open: ${quoteData.o}`;

  const prevPrice = document.getElementById('prev-price');
  prevPrice.textContent = `Previous Close: ${quoteData.pc}`;

  // The Epoch time is converted to local time using new Date()
  const lastUpdated = document.getElementById('last-updated');
  lastUpdated.textContent = `Last updated: ${new Date(quoteData.t *1000)}`;
  console.log('Original Epoch time', quoteData.t);
};

// Search stock by name
const stockSearchByName = async (tickerName) => {
 

  let compProfile = document.getElementById('company-profile');
  compProfile.setAttribute('style', 'display: flex');

  getQuote(tickerName);
  addSearchHistory(tickerName);
  /**
   * Company Profile: Fetch ticker details from Finnhub
   * Reference: https://finnhub.io/docs/api/company-profile2
   *  */
  let fetchStockDetails = await fetch(
    `https://finnhub.io/api/v1/stock/profile2?symbol=${tickerName}&token=cpqk53pr01qo647np200cpqk53pr01qo647np20g`
  );

  // console.log(fetchStockDetails)
  let stockData = await fetchStockDetails.json();

  console.log(stockData, 'stock data');

  let stockName = document.getElementById('stock-name');
  stockName.textContent = `Ticker Name: ${stockData.name}`;

  let ticker = document.getElementById('stock-symbol');
  ticker.textContent = `Ticker Symbol: ${stockData.ticker}`;

  let tickerLogo = document.getElementById('logo-img');
  tickerLogo.src = `${stockData.logo}`;

  let website = document.getElementById('ticker-website');
  website.textContent = `Website: ${stockData.weburl}`;
    //  TO DO: Add URL to the website
  let link=document.createElement('a');
  link.setAttribute('href', stockData.weburl);
  console.log(link, 'link')
  website.appendChild(link);


  let phone = document.getElementById('ticker-phone');
  phone.textContent = `Phone: ${stockData.phone
    .replace(/\D+/g, '')
    .replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3')}`;

  let marketCap = document.getElementById('market-capitalization');
  marketCap.textContent = `Market Captialization: ${stockData.currency} ${stockData.marketCapitalization}`;

  let shares = document.getElementById('shares-outstanding');
  shares.textContent = `Outstanding Shares: ${stockData.shareOutstanding}`;

  let exchange = document.getElementById('stock-exchange');
  exchange.textContent = `Stock Exchange: ${stockData.exchange.toUpperCase()})`;

  let country = document.getElementById('ticker-country');
  country.textContent = `Country: ${stockData.country}`;

  let currency = document.getElementById('ticker-currency');
  currency.textContent = `Country: ${stockData.currency}`;
};

const addSearchHistory = async (item) => {
  let tickerArr = await JSON.parse(localStorage.getItem('ticker'));

  if (tickerArr) {
    if (tickerArr.indexOf(item) === -1) {
      tickerArr.push(item);
      localStorage.setItem('ticker', JSON.stringify(tickerArr));
    }
  } else {
    localStorage.setItem('ticker', JSON.stringify([item]));
  }
};

const getSearchHistory = async () => {
  let tickerArr = JSON.parse(localStorage.getItem('ticker'));
  let searchHistory = document.getElementById('search-history');
  let searchList = document.createElement('ul');
  // console.log(tickerArr)

  for (i = 0; i < tickerArr.length; i++) {
    let tickerEl = document.createElement('li');
    tickerEl.textContent = tickerArr[i].toUpperCase();
    tickerEl.setAttribute(
      'onclick',
      "stockSearchByName('" + tickerArr[i] + "')"
    );
    tickerEl.style.cursor = 'pointer';
    searchList.appendChild(tickerEl);
    searchHistory.appendChild(searchList);
  }
};

//Function to add search history


window.addEventListener('DOMContentLoaded', function (event) {
  getSearchHistory();
});
