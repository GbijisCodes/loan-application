const cars = [
    { brand: "Toyota", model: "Corolla", year: 2018, maxFunding: 1000000, loanamount:1000000 },
    { brand: "Honda", model: "Civic", year: 2019, maxFunding: 1750000, loanamount:1750000},
    { brand: "Mazda", model: "CX-5", year: 2020, maxFunding: 2500000, loanamount:2500000 },
    { brand: "BMW", model: "3 Series", year: 2021, maxFunding: 3250000 , loanamount:3250000},
    { brand: "Toyota", model: "Prado", year: 2022, maxFunding: 4000000,loanamount:4000000 }
  ];
  
  const toggleBtn = document.querySelector('.optionsslider img');
  const carList = document.querySelector('.carlist');
  const carName = document.querySelector('.carname');
  const carYear = document.querySelector('.caryear');
  const fundValue = document.querySelector('.fund');
  const loanamountfig = document.querySelector('.loanamountfigure');
  const upperboundvalue = document.querySelector('.values2');
  
  const loanAmountSlider = document.getElementById('loanAmountSlider');
  const loanPeriodSlider = document.getElementById('loanPeriodSlider');
  const loanAmountText = document.querySelector('.loanamountfigure');
  const loanPeriodText = document.querySelector('.loanperiodfigure');
  const monthlyInstallmentText = document.querySelector('.moneyvalue');
  
  let selectedCar = cars[0]; 
  const minLoanValue = 100000;
  
  // render car list
  function renderCarList() {
    carList.innerHTML = "";
  
    cars.forEach((car) => {
      const div = document.createElement('div');
      div.classList.add('caritem');
      if (car === selectedCar) div.classList.add('active');
  
      div.innerHTML = `
        <span>${car.brand} ${car.model} ${car.year}</span>
        <span>₦${car.maxFunding.toLocaleString()}</span>
      `;
  
      div.addEventListener('click', () => {
        selectedCar = car;
        updateSelectedCar();
        renderCarList();
        carList.classList.add('hidden');
      });
  
      carList.appendChild(div);
    });
  }
  
  // Toggle dropdown visibility
  toggleBtn.addEventListener('click', () => {
    carList.classList.toggle('hidden');
  });
  
  // Update selected car info
  function updateSelectedCar() {
    carName.textContent = `${selectedCar.brand} ${selectedCar.model}`;
    carYear.textContent = selectedCar.year;
    fundValue.textContent = `₦${selectedCar.maxFunding.toLocaleString()}`;
    upperboundvalue.textContent = `₦${selectedCar.loanamount.toLocaleString()}`;
    
    updateSliderForCar();
  }
  
  function updateSliderForCar() {
    loanAmountSlider.min = minLoanValue;
    loanAmountSlider.max = selectedCar.loanamount;
    loanAmountSlider.value = minLoanValue;
    updateLoanAmountDisplay();
  }
  
  function updateLoanAmountDisplay() {
    const min = parseFloat(loanAmountSlider.min);
    const max = parseFloat(loanAmountSlider.max);
    const val = parseFloat(loanAmountSlider.value);
  
    //  percentage for blue fill
    const percent = ((val - min) / (max - min)) * 100;
  
    // Update the blue fill gradient
    loanAmountSlider.style.background = `linear-gradient(to right, #29BBCF ${percent}%, #E5E7EC ${percent}%)`;
  
    // Update text
    loanAmountText.textContent = `₦${val.toLocaleString()}`;
  
    // Update monthly installment
    updateMonthlyInstallment();
  }
  
  function updateLoanPeriodDisplay() {
    const min = parseFloat(loanPeriodSlider.min);
    const max = parseFloat(loanPeriodSlider.max);
    const val = parseFloat(loanPeriodSlider.value);
  
    // Calculate percentage for blue fill
    const percent = ((val - min) / (max - min)) * 100;
  
    // Update the blue fill gradient
    loanPeriodSlider.style.background = `linear-gradient(to right, #29BBCF ${percent}%, #E5E7EC ${percent}%)`;
  
    // Update text
    loanPeriodText.textContent = `${val} Months`;
  
    // Update monthly installment
    updateMonthlyInstallment();
  }
  
  function updateMonthlyInstallment() {
    const loanAmount = parseFloat(loanAmountSlider.value);
    const loanPeriod = parseFloat(loanPeriodSlider.value);
    
    const monthly = loanAmount / loanPeriod;
    monthlyInstallmentText.textContent = `₦${Math.round(monthly).toLocaleString()}`;
  }
  
  loanAmountSlider.addEventListener('input', updateLoanAmountDisplay);
  loanPeriodSlider.addEventListener('input', updateLoanPeriodDisplay);
  
  
  renderCarList();
  updateSelectedCar();
  updateLoanPeriodDisplay(); // Initialize loan period slider display
  