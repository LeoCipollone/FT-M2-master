var traverseDomAndCollectElements = function (matchFunc, startEl) {
  var resultSet = [];

  if (typeof startEl === "undefined") {
    startEl = document.body;
  }

  // recorre el árbol del DOM y recolecta elementos que matchien en resultSet
  // usa matchFunc para identificar elementos que matchien

  // TU CÓDIGO AQUÍ
  if(matchFunc(startEl)) {
    resultSet.push(startEl);
  }
  for (let i = 0; i < startEl.children.length; i++) {
    //resultSet = resultSet.concat(traverseDomAndCollectElements(matchFunc, startEl.children[i]));
    //Spread operator ... concatena
    let child = startEl.children[i];
    let elementsFound = traverseDomAndCollectElements(matchFunc, child);
    resultSet = [...resultSet, ...elementsFound];
  }
  return resultSet;
};

// Detecta y devuelve el tipo de selector
// devuelve uno de estos tipos: id, class, tag.class, tag

var selectorTypeMatcher = function (selector) {
  // tu código aquí
  for (let i = 1; i < selector.length; i++) {
    if (selector[i] === ".") return "tag.class";
  }
  if (selector[0] === "#") return "id";
  if (selector[0] === ".") return "class";
  else return "tag";
};

// NOTA SOBRE LA FUNCIÓN MATCH
// recuerda, la función matchFunction devuelta toma un elemento como unn
// parametro y devuelve true/false dependiendo si el elemento
// matchea el selector.

var matchFunctionMaker = function (selector) {
  var selectorType = selectorTypeMatcher(selector);
  var matchFunction;
  if (selectorType === "id") {
    matchFunction = function (el) {
      return el.id === selector.substr(1);
    };
  } else if (selectorType === "class") {
    matchFunction = function (el) {
      // let classes = el.classList;
      // for (let i = 0; i < classes.length; i++) {
      //   if ("." + classes[i] === selector)
      //   return true;
      // }
      // return false;
      return el.classList.contains(selector.substr(1));
    };
  } else if (selectorType === "tag") {
    matchFunction = function (el) {
      return el.tagName.toLowerCase() === selector;
    };
  } else if (selectorType === "tag.class") {
    matchFunction = function (el) {
      return el.tagName.toLowerCase() === selector.split(".")[0] && el.classList.contains(selector.split(".")[1]);
    };
  }
  return matchFunction;
};

var $ = function (selector) {
  var elements;
  var selectorMatchFunc = matchFunctionMaker(selector);
  elements = traverseDomAndCollectElements(selectorMatchFunc);
  return elements;
};
