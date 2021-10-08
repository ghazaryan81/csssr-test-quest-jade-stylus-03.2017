// ==UserScript==
// @name        NULL Opener object
// @namespace   nullopenerobjectns
// @description Clears the window.openeer object.
// @version     1
// @grant       none
// @run-at      document-start
// ==/UserScript==
'use strict';
window.opener = null;

import svg4everybody from 'svg4everybody';
import $ from 'jquery';
import {clearAltTitle, addId, clearText, AutoResize, defaultChecked, changeChacked, targetBlank}from './functions';

targetBlank('.g-js-tb');
clearAltTitle('.g-js-hta');
addId('.js-profile-label', '.js-profile-textarea', 'textarea');
addId('.js-checkbox__label', '.js-checkbox__input', 'checkbox');
addId('.js-radio__label', '.js-radio__input', 'radio');
clearText('textarea');
defaultChecked('.js-checkbox__input', '.js-checkbox', 'selected');
changeChacked('.js-checkbox__input', '.js-checkbox', 'selected');
changeChacked('.js-radio__input', '.js-radio', 'selected');

const profile = new AutoResize('js-profile', 'js-profile-row', 'js-profile-row__pre', 'js-span', 0);
profile.createPre();
profile.eventsTextarea();
profile.defaultHeightTextarea();
profile.copyToPre();

const startAutoHeight = () => {
	for (let i = profile.textarea.length; i--; i === 0){
		profile.autoHeight(i);
	}
};

// about me
const about = new AutoResize('js-about-me', 'js-about-me-row', 'js-about-me-row__pre', 'js-about-me-row__span', 172);
about.createPre();
about.eventsTextarea();
about.defaultHeightTextarea();
about.copyToPre();

const startAutoHeight2 = () => {
	for (let i = about.textarea.length; i--; i === 0){
		about.autoHeight(i);
	}
};

// spoiler
const spoiler = new AutoResize('plans', 'js-spoiler', 'js-spoiler__pre', 'js-spoiler__span', 112);
spoiler.createPre();
spoiler.eventsTextarea();
spoiler.defaultHeightTextarea();
spoiler.copyToPre();

const startAutoHeight3 = () => {
	for (let i = spoiler.textarea.length; i--; i === 0){
		spoiler.autoHeight(i);
	}
};

// slider
const sliderTrack = document.querySelector('.js-slider__track');
let sliderAppendPlace = document.querySelector('.js-handle-cell');
const jsExperienceLevel = document.querySelectorAll('.point-title');
const levelPoints = [0, 150, 376, 770];

const slider = position => {
	noUiSlider.create(sliderAppendPlace, {
		start: 400,
		connect: true,
		orientation: position,
		range: {min: 0, max: 770}
	});

	const rangeValue = document.querySelector('.js-range-value');
	sliderAppendPlace.noUiSlider.on('update', (values, handle) => {
		rangeValue.value = Math.round((values[handle] * 100) / 770) + ' %';
	});
};

const level = it => {
	sliderAppendPlace.noUiSlider.set(levelPoints[it]);
};

// on slider point click
for (let i = jsExperienceLevel.length; i--; i === 0){
	jsExperienceLevel[i].addEventListener('click', () => {
		level(i);
	});
}

const reinitSlider = position => {
	if (sliderAppendPlace){
		sliderAppendPlace.parentElement.removeChild(sliderAppendPlace);
		const sliderAppendPlaceCreate = document.createElement('div');
		sliderAppendPlaceCreate.className = 'handle-cell js-handle-cell';
		sliderTrack.appendChild(sliderAppendPlaceCreate);
		sliderAppendPlace = document.querySelector('.js-handle-cell');
		setTimeout(() => {
			slider(position);
		}, 100);
	}
};

let large = true;
const resizeWindow = () => {
	if (window.innerWidth < 780){
		if (large === true){
			reinitSlider('vertical');
			large = false;
		}
	}else if (large === false){
		reinitSlider('horizontal');
		large = true;
	}
};

document.addEventListener('DOMContentLoaded', () => {
	startAutoHeight();
	startAutoHeight2();
	startAutoHeight3();
	if (window.innerWidth < 780){
		slider('vertical');
	}else {
		slider('horizontal');
	}
});

window.addEventListener('resize', () => {
	startAutoHeight();
	startAutoHeight2();
	startAutoHeight3();
	resizeWindow();
});


$(() => {
	svg4everybody();

	// open and close hide text field
	let spoilerHeight;
	const radioDetect = () => {
		spoilerHeight = document.querySelector('.js-spoiler-textarea').scrollHeight;
		if (document.querySelector('.js-radio__input:checked').value === 'Другое'){
			$('.js-spoiler').stop().animate({minHeight: spoilerHeight, height: 'auto'}, 300, () => {
				$('.js-spoiler').css({minHeight: 'auto', height: 'auto'});
			});
		}else {
			$('.js-spoiler').stop().animate({minHeight: 0, height: 0}, 300, () => {});
		}
	};

	const plansRadio = document.querySelectorAll('.js-radio__input');
	spoilerHeight = document.querySelector('.js-spoiler-textarea').scrollHeight;
	for ( let i = plansRadio.length; i--; i === 0 ){
		plansRadio[i].addEventListener('change', () => {
			radioDetect();
		});
	}

	radioDetect();

	const label = document.querySelector('.js-date__label');
	const inputarea = document.querySelector('.js-date__input');
	const getter = document.querySelector('.js-date__getter');
	const eventsList = ['input', 'propertychange', 'keyup', 'change', 'keydown', 'keypress'];

	label.addEventListener('click', () => {
		inputarea.focus();
	});

	for (let j = eventsList.length; j--; j === 0){
		inputarea.addEventListener(eventsList[j], () => {
			getter.value = inputarea.innerHTML;
		});
	}

});
