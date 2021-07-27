import Vue from 'vue'
import { 
    Toast,
    Dialog,
    Button,
    Cell, 
    CellGroup,
    Icon,
    Popup,
    Checkbox, 
    CheckboxGroup,
    DatetimePicker,
    Loading,
    Picker,
    RadioGroup, 
    Radio,
    Switch,
    ActionSheet,
    DropdownMenu, 
    DropdownItem,
    Notify,
    Overlay,
    Collapse, 
    CollapseItem,
    CountDown,
    Lazyload,
    NoticeBar,
    Tab, 
    Tabs,
} from 'vant'
Object.assign(Vue.prototype, {
  $toast: Toast,
  $dialog: Dialog,
  $notify:Notify
})

Vue.use(Button);
Vue.use(Cell).use(CellGroup);
Vue.use(Icon);
Vue.use(Popup);
Vue.use(Checkbox).use(CheckboxGroup);
Vue.use(DatetimePicker);
Vue.use(Loading);
Vue.use(Picker);
Vue.use(RadioGroup);
Vue.use(Radio);
Vue.use(Switch);
Vue.use(ActionSheet);
Vue.use(DropdownMenu).use(DropdownItem);
Vue.use(Overlay);
Vue.use(Collapse).use(CollapseItem);
Vue.use(CountDown);
Vue.use(Lazyload);
Vue.use(NoticeBar);
Vue.use(Tab).use(Tabs);
