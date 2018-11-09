import $ from 'jquery'

class TabSwitch {
  constructor(element) {
    this.$tabSwitchWrapper = $(element)
    this.tabSwitchMenu = this.$tabSwitchWrapper
      .find('ul')
      .first()
      .find('li')
    this.tabSwitchConstent = this.$tabSwitchWrapper
      .find('ul')
      .last()
      .find('li')
    this.contentsArray = []
  }
  set() {
    this.bindEvent()
    this.pushContents()
  }
  // メニューにdata属性を付与
  bindEvent() {
    this.tabSwitchMenu.each((i, elem) => {
      $(elem).attr('data-target', i)
      this.handleMenuOnClick(elem)
    })
  }
  // コンテンツを格納
  pushContents() {
    this.tabSwitchConstent.each((i, elem) => {
      this.contentsArray.push(elem)
    })
  }
  // メニューonClickハンドリング
  handleMenuOnClick(elem) {
    $(elem).on('click', () => {
      const targetIndex = $(elem).data('target')
      $(this.tabSwitchConstent).hide()
      $(this.contentsArray[targetIndex]).show()
    })
  }
}

export default TabSwitch
