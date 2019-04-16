import { observable, action } from 'mobx';

class ColorStore {
  @observable color = 'white';

  @action
  changeColor(color) {
    this.color = color;
  }
}

export default new ColorStore();
