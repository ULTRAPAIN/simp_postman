import "bootstrap"
import "bootstrap/dist/css/bootstrap.min.css"
import axios from "axios"

const form =document.querySelector("[data-form]")
const queryParamsContainer=document.querySelector('[data-query-params]');
const requestHeaderContainer=document.querySelector('[data-request-headers]');
const keyValueTemplate=document.querySelector('[data-key-value-template]');
const responseHeaderContainers=document.querySelector('[data-response-headers]');


document.querySelector('[data-add-query-param-btn]').addEventListener('click',(e)=>{
queryParamsContainer.append(createKeyValuePair());
});

document.querySelector('[data-add-request-header-btn]').addEventListener('click',(e)=>{
requestHeaderContainer.append(createKeyValuePair());
    });
    
    
queryParamsContainer.append(createKeyValuePair());
requestHeaderContainer.append(createKeyValuePair());

form.addEventListener('submit',(e)=>{
    e.preventDefault();

    axios({
  url:document.querySelector('[data-url]').value,
  method: document.querySelector('[data-method]').value,
  params:keyVlauePairsToObjecs(queryParamsContainer),
headers:keyVlauePairsToObjecs(requestHeaderContainer),
}).then(response=>{
    document.querySelector('[data-response-section]').classList.remove('d-none');
    // updateResponseDetails(response)
    // updateResponseEditor(response.data)
    updateResponseHeaders(response.headers)
    console.log(response);
})});

function createKeyValuePair(){
    const element =keyValueTemplate.content.cloneNode(true);
element.querySelector('[data-remove-btn]').addEventListener('click',(e)=>{
e.target.closest('[data-key-value-pair]').remove();
});
return element
}

function keyVlauePairsToObjecs(container){
const pairs=container.querySelectorAll('[data-key-value-pair]');
return [...pairs].reduce((data,pair)=>{
    const key=pair.querySelector('[data-key]').value
    const value=pair.querySelector('[data-value]').value
    if (key=== '')return data
    return { ...data,[key]:value}
},{})
}

function updateResponseHeaders(headers){
    responseHeaderContainers.innerHTML =""
    Object.entries(headers).forEach(([key, value])=>{
        const keyElement=document.createElement('div')
        keyElement.textContent = key
        responseHeaderContainers.append(keyElement)
        const valueElement=document.createElement('div')
        valueElement.textContent = value
        responseHeaderContainers.append(valueElement)
    })
}