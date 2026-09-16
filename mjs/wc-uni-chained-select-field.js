import { _wcl } from 'https://unpkg.com/uni-input-field/mjs/common-lib.js';
import { _wccss } from 'https://unpkg.com/uni-input-field/mjs/common-css.js';
import { colorPalette as _uniColorPalette } from 'https://unpkg.com/uni-input-field/mjs/uni-css.js';
import Mustache from './mustache.js';

import 'https://unpkg.com/uni-select-field/mjs/wc-uni-select-field.js';
import 'https://unpkg.com/msc-scroll-fader/mjs/wc-msc-scroll-fader.js';

const defaults = {
  tree: []
};
const booleanAttrs = [];
const objectAttrs = ['tree'];
const custumEvents = {
  pick: 'uni-chained-select-field-pick',
};
const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

const template = document.createElement('template');
template.innerHTML = `
<style>
${_wccss}
${_uniColorPalette}

:host {
  position: relative;
  display: block;
}

:host([hidden]) {
  display: none;
}

.main {
  --max-column-block-size: var(--uni-chained-select-field-max-column-block-size, 231px);
  --position-area: var(--uni-chained-select-field-list-position-area, bottom span-all);

  position: relative;
  inline-size: 100%;

  [name="select"] {
    position: relative;
    inline-size: 100%;

    anchor-name: --input-anchor;
    display: block;

    &::after {
      content: '';
      position: absolute;
      inset: 0;
      margin: 0;
      background: transparent;
    }
  }

  [name="list"] {
    &:popover-open {
      translate: 0 0;
      opacity: 1;
      display: flex;

      @starting-style {
        translate: 0 20px;
        opacity: 0;
      }
    }

    &::backdrop {
      background: transparent;
    }

    /* anchor-position */
    margin: 0;
    position-anchor: --input-anchor;
    position-area: var(--position-area);
    margin-top: 8px;
    position-try-fallbacks: flip-block;

    border: 0 none;
    background: transparent;
    box-shadow: 0 none;
    box-sizing: border-box;

    translate: 0 -20px;
    opacity: 0;
    z-index: 2147483647;

    transition: 
      translate .25s cubic-bezier(.4,0,.2,1), 
      opacity .25s cubic-bezier(.4,0,.2,1),
      overlay .25s cubic-bezier(.4,0,.2,1) allow-discrete,
      display .25s cubic-bezier(.4,0,.2,1) allow-discrete;
  }
}
</style>

<div class="main" ontouchstart="">
  <slot name="select"></slot>
  <slot name="list" popover></slot>
</div>
`;

const templateOptionList = document.createElement('template');
templateOptionList.innerHTML = `
<div slot="list" class="option-list"></div>
`;

const templateColumn = document.createElement('template');
templateColumn.innerHTML = `
<div class="option-list__column" data-layer="{{layer}}">
  <msc-scroll-fader>
    <div class="option-list__column__ens">
      {{#units}}
        <button
          type="button"
          class="option-list__column__ens__unit {{#hasChildren}}option-list__column__ens__unit--has-children{{/hasChildren}}"
          data-value="{{value}}""
        >
          {{content}}
        </button>
      {{/units}}
    </idv>
  </msc-scroll-fader>
</div>
`;

const templateSelectOption = document.createElement('template');
templateSelectOption.innerHTML = `
<option value="{{value}}">{{content}}</option>
`;

/* style injection */
const styleInjection = `
uni-chained-select-field {
  :nth-child(n + 2 of [slot="select"]) {
    display: none;
  }

  :nth-child(n + 2 of [slot="list"]) {
    display: none;
  }
  
  uni-select-field [slot="select"] {
    interactivity: inert;
  }

  /* option-list */
  .option-list {
    /* reset */
    background: transparent;
    border: 0 none;
    outline: 0 none;
    resize: none;
    box-shadow: none;
    box-sizing: border-box;
    margin: 0;
    padding: 0;

    padding: 12px;
    border-radius: 12px;
    border: 0 none;
    background: rgba(255 255 255);
    box-shadow: 0 2px 8px 0 rgba(0 0 0/.25);
    box-sizing: border-box;

    display: flex;
    align-items: stretch;

    view-transition-name: uni-chained-select-field-cascader-wrap;

    .option-list__column {
      flex-shrink: 0;
      position: relative;
      display: flex;

      &:not([data-layer='0']):before {
        --padding: 6px;

        flex-shrink: 0;
        content: '';
        inline-size: 1px;
        block-size: calc(100% - var(--padding) * 2);
        background-color: var(--ct_divider_main_general);
        background-clip: content-box;
        padding: var(--padding);
      }

      button {
        background: transparent;
        border: 0 none;
        outline: 0 none;
        resize: none;
        appearance: none;
        box-shadow: none;
        box-sizing: border-box;
        white-space: nowrap;
        margin: 0;
        padding: 0;
      }

      msc-scroll-fader {
        max-block-size: var(--max-column-block-size);
      }

      .option-list__column__ens{
        display: block;

        .option-list__column__ens__unit {
          --sign-display: none;

          --background-color-normal: transparent;
          --background-color-active: rgba(245 245 245);
          --background-color: var(--background-color-normal);

          --color-normal: var(--ct_text_main_general);
          --color-active: var(--ct_text_moderate_general);
          --color: var(--color-normal);

          &[data-has-children],
          &.option-list__column__ens__unit--has-children {
            --sign-display: block;
          }

          &::after {
            content: '';
            inline-size: 20px;
            aspect-ratio: 1/1;
            background-color: rgba(0 0 0);
            clip-path: path(evenodd, 'M13.4895 9.21434C13.9235 9.64826 13.9235 10.3518 13.4895 10.7857L8.03433 16.2409L6.62012 14.8267L11.4468 10L6.62012 5.17334L8.03433 3.75912L13.4895 9.21434Z');
            display: var(--sign-display);
          }

          &:focus-visible {
            --background-color: var(--background-color-active);
            --color: var(--color-active);
          }

          @media (hover: hover) {
            &:hover {
              --background-color: var(--background-color-active);
              --color: var(--color-active);
            }
          }

          &[data-active] {
            --background-color: var(--background-color-active);
            --color: var(--color-active);
          }

          font-size: 16px;
          color: var(--color);
          line-height: 1.6;
          min-inline-size: 120px;
          block-size: var(--column-unit-block-size);
          padding: 8px;
          border-radius: 6px;
          background-color: var(--background-color);
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 8px;

          transition:
            color .2s ease,
            background-color .2s ease
          ;
        }
      }
    }
  }
}

::view-transition-group(uni-chained-select-field-cascader-wrap) {
  animation-duration: .15s;
  animation-timing-function: cubic-bezier(.4, 0, .2, 1);
  overflow: clip;

  border-radius: 12px;
  box-shadow: 0 2px 8px 0 rgba(0 0 0/.25);
}

::view-transition-old(uni-chained-select-field-cascader-wrap),
::view-transition-new(uni-chained-select-field-cascader-wrap) {
  animation: none;
  mix-blend-mode: normal;
  
  width: max-content !important;
  height: 100% !important;
  object-fit: none !important;
  object-position: 0 0 !important;
  transform-origin: 0 0 !important;
}

::view-transition-old(uni-chained-select-field-cascader-wrap) {
  z-index: 1;
}
::view-transition-new(uni-chained-select-field-cascader-wrap) {
  z-index: 2;
}
`;

const INJECT_KEY = Symbol.for('uni.chained.select.field.ui.injected');
const uiInit = () => {
  if (window[INJECT_KEY]) {
    return;
  }

  const sheet = new CSSStyleSheet();
  sheet.replaceSync(styleInjection);
  document.adoptedStyleSheets = [...document.adoptedStyleSheets, sheet];

  window[INJECT_KEY] = true;
};
uiInit();

class CascaderStore {
  constructor(treeData = []) {
    this.rootData = treeData;
    this.nodeMap = new Map();
    this.parentMap = new Map();
    this.buildIndex(treeData);
  }

  buildIndex(nodes, parent = null) {
    for (const node of nodes) {
      this.nodeMap.set(node.value, node);
      if (parent) {
        this.parentMap.set(node.value, parent);
      }
      if (node.children?.length) {
        this.buildIndex(node.children, node);
      }
    }
  }

  getNode(value) {
    return this.nodeMap.get(value) || null;
  }

  getPath(value) {
    const path = [];
    let current = this.getNode(value);

    while (current) {
      path.unshift({
        content: current.content,
        value: current.value
      });
      current = this.parentMap.get(current.value);
    }

    return path;
  }

  getColumns(value = null) {
    if (!value) {
      return [this.rootData];
    }

    const targetNode = this.getNode(value);
    if (!targetNode) {
      return [this.rootData];
    }

    const nodeChain = [];
    let current = targetNode;
    while (current) {
      nodeChain.unshift(current);
      current = this.parentMap.get(current.value);
    }

    const columns = [];
    
    columns.push(this.rootData);

    for (let i = 0; i < nodeChain.length; i++) {
      const node = nodeChain[i];
      if (node.children?.length) {
        columns.push(node.children);
      }
    }

    return columns;
  }
}

export class UniChainedSelectField extends HTMLElement {
  #data;
  #nodes;
  #config;

  constructor(config) {
    super();

    // template
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));

    // data
    this.#data = {
      controller: '',
      store: '',
      values: []
    };

    // nodes
    this.#nodes = {
      slotSelect: this.shadowRoot.querySelector('slot[name=select]'),
      slotList: this.shadowRoot.querySelector('slot[name=list]')
    };

    // config
    this.#config = {
      ...defaults,
      ...config // new UniChainedSelectField(config)
    };

    // evts
    this._onFocus = this._onFocus.bind(this);
    this._onSlotchange = this._onSlotchange.bind(this);
    this._onToggle = this._onToggle.bind(this);
    this._onClick = this._onClick.bind(this);
  }

  async connectedCallback() {
    const { config, error } = await _wcl.getWCConfig(this);
    const { slotSelect, slotList } = this.#nodes;

    if (error) {
      console.warn(`${_wcl.classToTagName(this.constructor.name)}: ${error}`);
      this.remove();
      return;
    } else {
      this.#config = {
        ...this.#config,
        ...config
      };
    }

    // upgradeProperty
    Object.keys(defaults).forEach((key) => this.#upgradeProperty(key));

    // evts
    this.#data.controller = new AbortController();
    const signal = this.#data.controller.signal;
    slotSelect.addEventListener('slotchange', this._onSlotchange, { signal });
    slotList.addEventListener('toggle', this._onToggle, { signal });
    slotList.addEventListener('click', this._onClick, { signal });
    this.addEventListener('click', this._onFocus, { signal });
  }

  disconnectedCallback() {
    this.#data.controller.abort?.();
  }

  #format(attrName, oldValue, newValue) {
    const hasValue = newValue !== null;

    if (!hasValue) {
      if (booleanAttrs.includes(attrName)) {
        this.#config[attrName] = false;
      } else {
        this.#config[attrName] = defaults[attrName];
      }
    } else {
      switch (attrName) {
        case 'tree': {
          let values;

          try {
            values = JSON.parse(newValue);
          } catch(err) {
            console.warn(`${_wcl.classToTagName(this.constructor.name)}: ${err.message}`);
            values = window.structuredClone(defaults.options);
          }

          this.#config[attrName] = values;
          break;
        }
      }
    }
  }

  attributeChangedCallback(attrName, oldValue, newValue) {
    if (!UniChainedSelectField.observedAttributes.includes(attrName)) {
      return;
    }

    this.#format(attrName, oldValue, newValue);

    switch (attrName) {
      case 'tree': {
        this.#data.store = new CascaderStore(this.tree);
        this.#resetOptionList();
        break;
      }
    }
  }

  static get observedAttributes() {
    return Object.keys(defaults); // UniChainedSelectField.observedAttributes
  }

  static get supportedEvents() {
    return Object.keys(custumEvents).map(
      (key) => {
        return custumEvents[key];
      }
    );
  }

  #upgradeProperty(prop) {
    let value;

    if (UniChainedSelectField.observedAttributes.includes(prop)) {
      if (Object.prototype.hasOwnProperty.call(this, prop)) {
        value = this[prop];
        delete this[prop];
      } else {
        if (booleanAttrs.includes(prop)) {
          value = (this.hasAttribute(prop) || this.#config[prop]) ? true : false;
        } else if (objectAttrs.includes(prop)) {
          value = this.hasAttribute(prop) ? this.getAttribute(prop) : JSON.stringify(this.#config[prop]);
        } else {
          value = this.hasAttribute(prop) ? this.getAttribute(prop) : this.#config[prop];
        }
      }

      this[prop] = value;
    }
  }

  set tree(value) {
    if (value) {
      const newValue = [
        ...(typeof value === 'string' ? JSON.parse(value) : value)
      ];
      this.setAttribute('tree', JSON.stringify(newValue));
    } else {
      this.removeAttribute('tree');
    }
  }

  get tree() {
    return this.#config.tree;
  }

  get values() {
    return window?.structuredClone(this.#data.values) || [];
  }

  _onFocus() {
    const { slotList } = this.#nodes;

    if (!slotList.matches(':popover-open')) {
      slotList.showPopover();
    }
  }

  _onSlotchange() {
    this.#data.values = [];
    this.#resetOptionList();
  }

  _onToggle(evt) {
    if (evt.newState === 'open') {
      this.#rollActives();
    }
  }

  _onClick(evt) {
    const path = evt.composedPath();
    const target = path[0].closest('button');

    if (!target) {
      return;
    }

    if (!isSafari) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    Array.from(target.parentNode.querySelectorAll('[data-active]'))
      .forEach((node) => node.toggleAttribute('data-active', false));
    target.toggleAttribute('data-active', true);

    const column = target.closest('[data-layer]');
    const layer = +column.dataset.layer;
    const value = target.dataset.value;

    document.startViewTransition(() => {
      // clear siblings
      const siblings = Array.from(column.parentNode.querySelectorAll(`[data-layer="${layer}"]~.option-list__column`));
      siblings.forEach((node) => node.remove());

      const { children } = this.#data.store.getNode(value);

      if (children) {
        const data = {
          layer: layer + 1,
          units: children.map(
            (unit) => {
              const { content, value, children:C } = unit;

              return {
                content,
                value,
                hasChildren: !!C
              };
            }
          )
        };

        this.#nodes.optionList.insertAdjacentHTML('beforeend', Mustache.render(templateColumn.innerHTML, data));
      } else {
        this.#data.values = this.#data.store.getPath(value);
        const select = this.querySelector('[slot="select"] select');

        if (select) {
          const content = this.#data.values.map(({ content }) => content).join(' > ');
          let option = select.querySelector(`option[value="${value}"]`);
          
          if (!option) {
            select.insertAdjacentHTML('beforeend', Mustache.render(templateSelectOption.innerHTML, {
              value,
              content
            }));
          } else {
            option.value = value;
            option.textContent = content;
          }

          select.value = value;
        }

        // wait view-transition
        setTimeout(
          () => {
            this.hidePopover();
          }
        , 185);

        this.#fireEvent(custumEvents.pick);
      }
    });
  }

  #rollActives() {
    if (isSafari) {
      return;
    }

    Array.from(this.#nodes.optionList.querySelectorAll('[data-active]'))
      .forEach(
        (node) => {
          node.scrollIntoView({ block: 'start' });
        }
      );
  }

  showPopover() {
    this.#nodes.slotList.showPopover();
  }

  hidePopover() {
    this.#nodes.slotList.hidePopover(); 
  }

  togglePopover(force) {
    if (typeof force === 'boolean') {
      this.#nodes.slotList.togglePopover(force); 
    } else {
      this.#nodes.slotList.togglePopover(); 
    }
  }

  #resetOptionList() {
    this.querySelector('.option-list[slot=list]')?.remove();
    this.insertAdjacentHTML('beforeend', Mustache.render(templateOptionList.innerHTML));
    this.#nodes.optionList = this.querySelector('.option-list[slot=list]');

    const picked = this.querySelector('[slot="select"] select')?.value || null;
    const columns = this.#data.store.getColumns(picked);
    const path = this.#data.store.getPath(picked);

    columns.forEach(
      (column, idx) => {
        const data = {
          layer: idx,
          units: column.map(
            (unit) => {
              const { content, value, children } = unit;

              return {
                content,
                value,
                hasChildren: !!children
              };
            }
          )
        };

        this.#nodes.optionList.insertAdjacentHTML('beforeend', Mustache.render(templateColumn.innerHTML, data));
      
        if (path?.[idx]) {
          const { value } = path[idx];
          const active = this.#nodes.optionList.querySelector(`[data-layer="${idx}"] [data-value="${value}"]`);
          active.toggleAttribute('data-active', true);
        }
      }
    );

    this.#data.values = path;
  }

  #fireEvent(evtName, detail) {
    this.dispatchEvent(new CustomEvent(evtName,
      {
        bubbles: true,
        composed: true,
        ...(detail && { detail })
      }
    ));
  }

  refresh() {
    this.#resetOptionList();
  }
}

// define web component
const S = _wcl.supports();
const T = _wcl.classToTagName('UniChainedSelectField');
if (S.customElements && S.shadowDOM && S.template && !window.customElements.get(T)) {
  window.customElements.define(_wcl.classToTagName('UniChainedSelectField'), UniChainedSelectField);
}