const selectTags = document.querySelectorAll("select"),
  from = document.querySelector(".from-num"),
  to = document.querySelector(".to-num"),
  text = document.querySelector(".result");

selectTags.forEach((tag, id) => {
  for (let val in currency_list) {
    let selected;
    if (id == 0 && val == "USD") {
      selected = "selected";
    } else if (id == 1 && val == "INR") {
      selected = "selected";
    }
    let option = `<option ${selected} value='${val}'>${val}, ${currency_list[val]}</option>`;
    tag.insertAdjacentHTML("beforeend", option);
  }
});

const fetchData = async () => {
  text.textContent = "Fetching Rates... ";
  try {
    let fromNum = selectTags[0].value,
      toNum = selectTags[1].value,
      inputVal = parseFloat(from.value);

    if (typeof fromNum == "indefined") {
      document.querySelector(".container").innerHTML =
        "<h1>Error while fetching </h1>";
    }
    const response = await fetch(
      `https://v6.exchangerate-api.com/v6/ff8613f8023be45b7418ad2a/latest/${fromNum}`
    );
    const result = await response.json();
    const rate = result.conversion_rates[toNum].toFixed(2);
    const amount = inputVal * rate;
    to.value = amount;
    text.textContent = `${inputVal} ${fromNum} = ${amount} ${toNum}`;
  } catch (error) {
    document.querySelector(".container").innerHTML = "<h1>Error</h1>";
  }
};

fetchData();
from.addEventListener("input", fetchData);
selectTags.forEach((tag) => {
  tag.addEventListener("change", fetchData);
});
window.addEventListener("load", fetchData);
