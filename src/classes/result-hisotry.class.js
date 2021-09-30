const divHistory = document.querySelector('#History');


export const history = (operation, result) => {
    const resultInformation = document.createElement('div');
    resultInformation.innerHTML = `
    <div class="result_box">
        <small>${operation}</small>
        <h3>${result}</h3>
    </div>
    `;
    divHistory.append(resultInformation);
}