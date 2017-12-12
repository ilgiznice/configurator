/**
 * Вставка опций в селект
 * @param {String} container 
 * @param {Array} options 
 */
function populateSelect(container, options) {
  const select = $(`#${container}`);
  for (let i = 0; i < options.length; i++) {
    const option = $('<option>', {
      val: options[i],
      text: options[i]
    });
    select.append(option);
  }
}

const companies = products.map(function (product) {
  return product.company;
});

populateSelect('company', companies);

/**
 * Вставка радио в контейнер
 * @param {String} container 
 * @param {String} name 
 * @param {Array} radios 
 */
function populateRadio(container, name, radios) {
  const sector = $(`.${container}`);
  for (let i = 0; i < radios.length; i++) {
    const radio = $('<input>', {
      type: 'radio',
      name: name,
      val: radios[i],    
    });
    sector.append(radio).append(radios[i]);
  }
}

/**
 * Получение данных и вызов генератора
 */

const colors = products.map(function (product) {
  return product.color;
});

populateRadio('colors', 'colors', colors);

const memories = products.map(function (product) {
  return product.memory;
});

populateRadio('memory', 'memory', memories);

const rams = products.map(function (product) {
  return product.ram;
});

populateRadio('ram', 'ram', rams);

const state = {
  company: '',
  os: '',
  color: '',
  memory: '',
  ram: '',
};

function renderItems(products) {
  $('.js-products').html('');
  for (let i = 0; i < products.length; i++) {
    const div = $('<div>', { class: '.col-sm-4' });
    const divCompany = $('<div>', { text: products[i].company });
    const divName = $('<div>', { text: products[i].name });
    const divOs = $('<div>', { text: products[i].os });
    const divColor = $('<div>', { text: products[i].color });
    const divMemory = $('<div>', { text: products[i].memory });
    const divRam = $('<div>', { text: products[i].ram });
    div
      .append(divCompany)
      .append(divName)
      .append(divOs)
      .append(divColor)
      .append(divMemory)
      .append(divRam);
    $('.js-products').append(div);
  }
}

function grid() {
  const filteredProducts = products.filter(function (product) {
    const isCorrect = [];
    if (state.company !== '') {
      isCorrect.push(product.company === state.company);
    }
    if (state.os !== '') {
      isCorrect.push(product.os === state.os);
    }
    if (state.color !== '') {
      isCorrect.push(product.color === state.color);
    }
    if (state.memory !== '') {
      isCorrect.push(product.memory == state.memory);
    }
    if (state.ram !== '') {
      isCorrect.push(product.ram === Number(state.ram));
    }
    return isCorrect.every(function (val) {
      return val === true;
    });
  });
  renderItems(filteredProducts);
}

$('#company').change(function () {
  state.company = $(this).val();
  grid();
});

$('.os input').change(function () {
  state.os = $(this).val();
  grid();
});

$('.colors input').change(function () {
  state.color = $(this).val();
  grid();
});

$('.memory input').change(function () {
  state.memory = $(this).val();
  grid();
});

$('.ram input').change(function () {
  state.ram = $(this).val();
  grid();
});

grid();
