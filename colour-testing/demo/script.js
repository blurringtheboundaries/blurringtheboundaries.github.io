
// import {emit} from './general/emit.js';

/**
 * Replace an object element with its svg content, inline.
 * If the object has not loaded yet, try again every 100ms.
 * Note: display:none elements are not loaded and will crash this version
 * Match folders if not in root (basic implementation)
 * Borrowed from CM toolbox
 * @param {HTMLElement} objectElement 
 */

const replaceSvgObject = function(objectElement) {
    // console.log(objectElement)
    let contentDocument = objectElement.contentDocument;
    if(!contentDocument){return false}
    let newSvgElement = objectElement.contentDocument.querySelector('svg');
    if (!newSvgElement) {
        setTimeout(() => {
            if(window.verbose) console.log(`svg not loaded (${objectElement.id}), waiting.to try again..`)
            replaceSvgObject(objectElement);
        }, 100);
        return;
    }
    if(window.verbose) console.log(`svg loaded from ${objectElement.id}`);
    // console.log(`svg loaded from ${objectElement.id}`);
    
    // replace SVG folder name ...
    let folder = objectElement.getAttribute('data').split('/');
    if(folder.length>1){
        folder.pop(); 
        folder = folder.join('/');
        if(window.verbose) console.log('folder', folder);
        newSvgElement.querySelectorAll('image').forEach(image=>{
            let href = image.getAttribute('href') || image.getAttribute('xlink:href');
            image.removeAttribute('xlink:href');
            image.setAttribute('href', `${folder}/${href}`);
        });
    }
    
    objectElement.classList.forEach(className => {
        newSvgElement.classList.add(className);
    });
    
    let attributes = ['alt', 'title', 'width', 'height', 'aria-labelledby', 'aria-describedby', 'aria-label', 'role', 'aria-hidden'];
    attributes.forEach(attribute => {
        let value = objectElement.getAttribute(attribute);
        if(value){
            newSvgElement.setAttribute(attribute, value);
        }
    });
    
    if(objectElement.width){
        newSvgElement.setAttribute('width', objectElement.width);
        // newSvgElement.setAttribute('height', objectElement.height);
    }
    
    newSvgElement.title = objectElement.title;
    newSvgElement.classList.replace('svg-import', 'svg-imported');
    
    newSvgElement.id = `${objectElement.id}`;
    objectElement.replaceWith(newSvgElement); 
    if(newSvgElement.classList.contains('.loadhidden')){
        newSvgElement.style.display = 'none';
    }
    // emit('svg-replaced', newSvgElement);
}

/**
 * Replace all selected object elements with their svg content, inline.
 * @param {string} selector
 */

const replaceSvgAll = function (selector='object.svg-import', container = document){
    container.querySelectorAll(selector).forEach(element => {
        // console.log('replaceSvgAll', selector, element);
        if(window.verbose)console.log('replaceSvgAll', selector, element);
        replaceSvgObject(element) || element.addEventListener('load',()=>{
            replaceSvgObject(element);
        });
    });
}




document.addEventListener('DOMContentLoaded', function() {
    const svgObjects = document.querySelectorAll('object.svg-import');
    svgObjects.forEach(replaceSvgObject);
    document.querySelector('img').addEventListener('click', function(){
        document.querySelectorAll('.hue').forEach(x=>x.style.filter=`saturate(100%) hue-rotate(${Math.round(Math.random()*360)}deg)`)
        document.querySelector('img').style.opacity=Math.random();
    })
});