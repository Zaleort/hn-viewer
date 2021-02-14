<script>
import {
  defineComponent, h, withModifiers, ref, onMounted, onUnmounted,
} from 'vue';
import Icon from '@/components/Icon.vue';

export default defineComponent({
  name: 'Menu',
  components: {
    Icon,
  },
  props: {
    visible: {
      type: Boolean,
      default: false,
    },

    hamburger: {
      type: Boolean,
      default: false,
    },

    collapsed: {
      type: Boolean,
      default: null,
    },

    direction: {
      type: String,
      default: 'vertical',
      validator: (val) => ['vertical', 'horizontal'].indexOf(val) !== -1,
    },
  },

  emits: ['update:collapsed', 'update:visible'],

  setup(props, context) {
    const isMobile = ref(window.innerWidth < 1024);
    const close = () => context.emit('update:visible', false);
    const closeOnAction = () => {
      if (isMobile.value && props.hamburger) {
        context.emit('update:visible', false);
      }
    };

    const collapse = () => {
      context.emit('update:collapsed', !props.collapsed);
    };

    const handleVisible = () => {
      if (window.innerWidth < 1024 && !isMobile.value) {
        context.emit('update:visible', false);
        isMobile.value = true;
        return;
      }

      if (window.innerWidth > 1024 && isMobile.value) {
        isMobile.value = false;
        context.emit('update:visible', true);
      }
    };

    onMounted(() => {
      if (window.innerWidth > 1024) {
        context.emit('update:visible', true);
      }

      window.addEventListener('resize', handleVisible);
    });

    onUnmounted(() => {
      window.removeEventListener('resize', handleVisible);
    });

    return {
      isMobile,
      close,
      closeOnAction,
      collapse,
      handleVisible,
    };
  },

  render() {
    let nav = (
      <nav
        onClick={withModifiers(() => ({}), ['stop'])}
        class={{
          'hn-menu': true,
          'hn-menu--horizontal': this.direction === 'horizontal',
          'hn-menu--vertical': this.direction === 'vertical',
          'is-hamburger': this.hamburger,
          'is-visible': this.visible,
          'is-collapsed': this.collapsed,
        }}
      >
      </nav>
    );

    const navChildren = [this.$slots.default()];

    if (this.collapsed !== null) {
      const collapse = h(
        <div onClick={this.collapse} class="hn-menu-item hn-menu-item--collapse">
          <icon
            icon={'angleDoubleLeft'}
            class={{
              'mr-2': true,
              'hn-icon--reverse': this.collapsed,
            }}
            />
          <span class="hn-menu-item__span">
            Collapse
          </span>
        </div>,
      );

      navChildren.push(collapse);
    }

    nav = h(nav, navChildren);
    if (this.direction === 'vertical' && this.hamburger) {
      return h(
        <div
          class={{
            'hn-menu__mask': true,
            'is-visible': this.visible,
            'is-collapsed': this.collapsed,
          }}
          onClick={this.close}
        />, [nav],
      );
    }

    return nav;
  },
});
</script>
