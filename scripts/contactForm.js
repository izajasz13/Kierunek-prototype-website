const onSubmit = (e) => {
    const imieInput = document.querySelector(".imie");
    const emailInput = document.querySelector(".email");
    const wiadomoscInput = document.querySelector(".wiadomość");
    const imie = imieInput.value;
    const email = emailInput.value;
    const wiadomosc = wiadomoscInput.value;

    console.log(imie);
    console.log(email);
    console.log(wiadomosc);

    imieInput.value = '';
    emailInput.value = '';
    wiadomoscInput.value = '';
}

export const attachContactListeners = () => {
    const button = document.querySelector(".button-contact");
    button.addEventListener('click', onSubmit)
}