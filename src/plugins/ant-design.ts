import type { App } from 'vue'
import {
  Form,
  FormItem,
  Button,
  Input,
  InputPassword,
  Layout,
  LayoutSider,
  LayoutHeader,
  LayoutContent,
  Menu,
  MenuItem,
  SubMenu,
  Dropdown,
  Table,
  TableColumn,
  Modal,
} from 'ant-design-vue'

export default {
  install(app: App) {
    app.component('AForm', Form)
    app.component('AFormItem', FormItem)
    app.component('AButton', Button)
    app.component('AInput', Input)
    app.component('AInputPassword', InputPassword)
    app.component('ALayout', Layout)
    app.component('ALayoutSider', LayoutSider)
    app.component('ALayoutHeader', LayoutHeader)
    app.component('ALayoutContent', LayoutContent)
    app.component('AMenu', Menu)
    app.component('AMenuItem', MenuItem)
    app.component('ASubMenu', SubMenu)
    app.component('ADropdown', Dropdown)
    app.component('ATable', Table)
    app.component('ATableColumn', TableColumn)
    app.component('AModal', Modal)
  },
}
