'use strict'

document.addEventListener('DOMContentLoaded', function(){

	const bob = document.querySelector('.face')
	let bobLeftSpace = 50
	let bottom = 0
	let gravity = 0.9
	let isJumping = false
	let isGoingLeft = false
	let isGoingRight = false
	let left = 0
	let timerRightId;
	let timerLeftId;
	

	function jump() {
		bob.classList.remove('face-slide')
		bob.classList.add('face')
		if (isJumping) return
		let timerUpId = setInterval(function() {
			if (bottom > 250) {
				clearInterval(timerUpId)
				let timerDownId = setInterval(function () {
					if (bottom < 0) {
						clearInterval(timerDownId)
						isJumping = false
					}
					bottom -= 5
					bob.style.bottom = bottom + 'px'	
				}, 20)
			}
			isJumping = true
			bottom += 30
			bottom = bottom * gravity
			bob.style.bottom = bottom + 'px'
		}, 20)
	}

	function slideLeft() {
		bob.classList.add('face-slide')
		bob.classList.remove('face')
		if (isGoingRight) {
			clearInterval(timerRightId)
			isGoingRight = false
		}
		isGoingLeft = true
		timerLeftId = setInterval(function() {
			left -= 5
			bob.style.left = left + 'px'
		}, 30)
	}

	function slideRight() {
		bob.classList.add('face-slide')
		bob.classList.remove('face')
		if (isGoingLeft) {
			clearInterval(timerLeftId)
			isGoingLeft = false
		}
		isGoingRight = true
		timerRightId = setInterval(function(){
			left += 5
			bob.style.left = left + 'px'
		}, 30)
	}

	function resetTimer() {
		clearInterval(timerLeftId)
		clearInterval(timerRightId)
		isGoingLeft = false
		isGoingRight = false
	}

	function borderCheck() {
		if (bob < bobLeftSpace) {
			resetTimer()
		}
	}


	
	//keyCode 38 is Up-key
	function control(e) {
		if (e.keyCode === 38) {
			jump()
		} else if (e.keyCode === 37) {
			slideLeft()
			borderCheck()
		} else if (e.keyCode === 39) {
			slideRight()
		} else if (e.keyCode === 40) {
			resetTimer()
		}
	}

	document.addEventListener('keydown', control)
})







