const onSubmit = async (e) => {
    e.preventDefault();

    const form = e.target.parentNode;
    const imieInput = document.querySelector(".imie");
    const emailInput = document.querySelector(".email");
    const wiadomoscInput = document.querySelector(".wiadomość");
    const name = imieInput.value;
    const email = emailInput.value;
    const message = wiadomoscInput.value;

    const obj = {
        name,
        email,
        message
    };

    try {
        const data = await postData('https://intense-meadow-03245.herokuapp.com/contact', obj);
        form.classList.add("submitForm");
        form.addEventListener('animationend', e => {
            e.currentTarget.classList.remove("submitForm")
            imieInput.value = '';
            emailInput.value = '';
            wiadomoscInput.value = '';
        });
    }
    catch (error) {
        console.error(error);
    }
}

async function postData(url = '', data = {}) {
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(data)
    });
    return await response;
}

export const attachContactListeners = () => {
    const button = document.querySelector(".kontakt .button");
    button.addEventListener('click', onSubmit)
}