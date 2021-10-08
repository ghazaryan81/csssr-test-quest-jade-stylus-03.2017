const linkAutoHeight = (textareaElem, preElem, spanElem) => {
	spanElem.innerHTML = textareaElem.value + ' ';
	let getHeight = textareaElem.getAttribute('data-height');
	if (textareaElem.getAttribute('data-default-height')){
		getHeight = textareaElem.getAttribute('data-default-height');
	}
	if (textareaElem.scrollHeight <= getHeight ){
		textareaElem.style.height = getHeight + 'px';
	}else {
		textareaElem.style.height = preElem.scrollHeight + 'px';
	}
};

class AutoResize {

	constructor(profileContainer, profileRow, profilePre, profileSpan){
		this.profile = document.querySelector(`.${profileContainer}`);
		this.textarea = this.profile.querySelectorAll('textarea');
		this.row = this.profile.querySelectorAll(`.${profileRow}`);
		this.preClassName = profilePre.split('js-')[1];
		this.spanClassName = profileSpan.split('js-')[1];
	}
	createPre(){
		const textarea = this.textarea;
		const row = this.row;
		const preClassName = this.preClassName;
		const spanClassName = this.spanClassName;
		for (let i = textarea.length; i--; i === 0) {
			const pre = document.createElement('pre');
			const span = document.createElement('span');
			pre.className = preClassName;
			span.className = spanClassName;
			pre.appendChild(span);
			row[i].insertBefore(pre, null);
		}
	} // end createPre

	eventsTextarea(){
		const textarea = this.textarea;
		const preEl = document.querySelectorAll(`.${this.preClassName}`);
		const spanEl = document.querySelectorAll(`.${this.spanClassName}`);
		const eventsList = ['input', 'propertychange', 'keyup', 'change', 'keydown', 'keypress'];
		for (let i = textarea.length; i--; i === 0){
			for (let j = eventsList.length; j--; j === 0){
				textarea[i].addEventListener(eventsList[j], () => {
					linkAutoHeight(textarea[i], preEl[i], spanEl[i]);
				});
			}
		}
	} // end eventsTextarea

	defaultHeightTextarea(){
		const textarea = this.textarea;
		let dataHeight;
		for (let i = textarea.length; i--; i === 0){
			dataHeight = textarea[i].scrollHeight;
			textarea[i].setAttribute('data-height', dataHeight);
		}
	} // end defaultHeightTextarea

	// copy content from textarea and paste to span in pre
	copyToPre(){
		const pre = this.profile.querySelectorAll(`.${this.preClassName}`);
		const textarea = this.textarea;
		for (let i = pre.length; i--; i === 0){
			pre[i].querySelector('span').innerHTML = textarea[i].innerHTML;
		}
	} // copyToPre

	autoHeight(i){
		const textareaElem = this.textarea[i];
		const preElem = this.row[i].querySelector(`.${this.preClassName}`);
		const spanElem = this.row[i].querySelector(`.${this.spanClassName}`);
		setTimeout(() => {
			linkAutoHeight(textareaElem, preElem, spanElem);
		});
	} // autoHeight

} // end class AutoResize

const targetBlank = className => {
	const targetBlankElements = document.querySelectorAll(className);
	for (let i = targetBlankElements.length; i--; i === 0){
		targetBlankElements[i].setAttribute('target', '_blank');
	}
};

const clearAltTitle = className => {
	const htaElem = document.querySelectorAll(className);
	const title = 'title';
	const alt = 'alt';
	for (let i = htaElem.length; i--; i === 0){
		htaElem[i].addEventListener('mouseover', () => {
			if (htaElem[i].hasAttribute(title)) {
				htaElem[i].setAttribute(`data-${title}`, htaElem[i].getAttribute(title));
				htaElem[i].removeAttribute(title);
			}
			if (htaElem[i].hasAttribute(alt)) {
				htaElem[i].setAttribute(`data-${alt}`, htaElem[i].getAttribute(alt));
				htaElem[i].removeAttribute(alt);
			}
		});
		htaElem[i].addEventListener('mouseout', () => {
			if (htaElem[i].hasAttribute(`data-${title}`)) {
				htaElem[i].setAttribute(title, htaElem[i].getAttribute(`data-${title}`));
				htaElem[i].removeAttribute(`data-${title}`);
			}
			if (htaElem[i].hasAttribute(`data-${alt}`)) {
				htaElem[i].setAttribute(alt, htaElem[i].getAttribute(`data-${alt}`));
				htaElem[i].removeAttribute(`data-${alt}`);
			}
		});
	}
};

const defaultChecked = (className, parentElement, addClassName) => {
	const checksParent = document.querySelectorAll(parentElement);
	const checks = document.querySelectorAll(className);
	for (let i = checks.length; i--; i === 0){
		if (checks[i].hasAttribute('checked')) {
			checksParent[i].className = checksParent[i].className + ' ' + addClassName;
		}
	}
};

const removeCheckedRadioDecor = () => {
	const radioElements = document.querySelectorAll('.js-radio');
	for (let i = 0; i < radioElements.length; i++){
		if (radioElements[i].querySelector('.js-radio__input').checked){
			radioElements[i].className = 'radio js-radio selected';
		}else {
			radioElements[i].className = 'radio js-radio';
		}
	}
};

const changeChacked = (className, parentElement, addClassName) => {
	const checksParent = document.querySelectorAll(parentElement);
	const checkList = document.querySelectorAll(className);
	for (let i = 0; i < checkList.length; i++){
		checkList[i].addEventListener('change', () => {
			if (checkList[i].checked) {
				if (checkList[i].getAttribute('type') === 'radio'){
					removeCheckedRadioDecor();
				}
				checksParent[i].className = checksParent[i].className + ' ' + addClassName;
			}else {
				checksParent[i].className = checksParent[i].className.split(' ')[0];
			}
		});
	}
};

const clearText = selector => {
	const allText = document.querySelectorAll(selector);
	for (let i = allText.length; i--; i === 0){
		let txt = allText[i].value;
		txt = txt.replace(/(\r\n|\n|\r)/gm, ' ');
		allText[i].value = txt.replace(/\s+/g, ' ');
	}
};

const addId = (labelSelctor, inputSelector, idName) => {
	const label = document.querySelectorAll(labelSelctor);
	const input = document.querySelectorAll(inputSelector);
	for (let i = input.length; i--; i === 0){
		label[i].setAttribute('for', `${idName}-${i}`);
		input[i].setAttribute('id', `${idName}-${i}`);
	}
};

removeCheckedRadioDecor();

// export {targetBlank, clearAltTitle, defaultChecked, changeChacked, clearText, AutoResize, addId};
export {clearAltTitle, clearText, addId, AutoResize, defaultChecked, changeChacked, targetBlank};
