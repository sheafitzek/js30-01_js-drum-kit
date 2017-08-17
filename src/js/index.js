const app = {
	keyDownEvent() {
		window.addEventListener(`keydown`, (e)=> {
			const audio = document.querySelector(`audio[data-key="${e.keyCode}"`);
			const key = document.querySelector(`.key[data-key="${e.keyCode}"`);

			if (!audio) return;
			if (e.repeat) return;
			audio.currentTime = 0;
			audio.play();
			key.classList.add(`playing`);
		});
	},

	onloadFunction() {
		app.keyDownEvent();
		app.transitionEndEvent();
	},

	playSound(target) {
		const audio = document.querySelectorAll(`audio`);

		audio.forEach((item, index)=> {
			if (item.dataset.key === target.dataset.key) {
				if (!audio[index]) return;
				// if (e.repeat) return;
				audio[index].currentTime = 0;
				audio[index].play();
				target.classList.add(`playing`);
			}
		});
	},

	removeTransition(e) {
		if (e.propertyName !== `transform`) return;
		this.classList.remove(`playing`);
	},

	transitionEndEvent() {
		const keys = document.querySelectorAll(`.key`);

		keys.forEach((key)=> {
			key.addEventListener(`transitionend`, this.removeTransition);
		});
	},
};

window.onload = app.onloadFunction;
