import $ from 'jquery'

const ClassName = {
  SHOW: 'show',
}

const Selector = {
  DATA_TOGGLE: '[data-toggle="collapse"]',
}

class Accordion {
  constructor(element) {
    this._wrapper = $(element)
    this._triggerArray = $.makeArray(
      document.querySelectorAll(Selector.DATA_TOGGLE)
    )
    this.bindEvent()
  }

  bindEvent() {
    this._triggerArray.forEach((obj, i) => {
      const target = $(obj).data('target')
      $(obj).on('click', () => {
        this.toggle(target)
      })
    })
  }

  toggle(target) {
    if ($(target).hasClass(ClassName.SHOW)) {
      $(target).removeClass(ClassName.SHOW)
    } else {
      $(target).addClass(ClassName.SHOW)
    }
  }
}

export default Accordion
