# uni-chained-select-field

[![Published on webcomponents.org](https://img.shields.io/badge/webcomponents.org-published-blue.svg)](https://www.webcomponents.org/element/uni-chained-select-field) [![DeepScan grade](https://deepscan.io/api/teams/16372/projects/32436/branches/1073592/badge/grade.svg)](https://deepscan.io/dashboard#view=project&tid=16372&pid=32436&bid=1073592)

&lt;uni-chained-select-field /> is an encapsulated Web Component built upon the foundation of the uniopen design language. It brings hierarchical, multi-level cascader selection into native form workflows, enabling developers to structure multi-tiered choices tailored to their specific interface context.

Implementation is straightforward: simply configure your structured dataset and connect your native form controls through their designated slots. The component dynamically orchestrates column expansions, seamless view transitions, and path resolution across levels—adapting complex hierarchical selections into a cohesive, fluid user experience while adhering to standard HTML form behaviors and uniopen design specifications.

![<uni-chained-select-field />](https://blog.lalacube.com/mei/img/preview/uni-chained-select-field.png)

## Basic Usage

&lt;uni-chained-select-field /> is a web component. All we need to do is put the required script into your HTML document. Then follow &lt;uni-chained-select-field />'s html structure and everything will be all set.

- Required Script

  ```html
  <script
    type="module"
    src="https://unpkg.com/uni-chained-select-field/mjs/wc-uni-chained-select-field.js">        
  </script>
  ```

- Structure

  Put &lt;uni-chained-select-field /> into HTML document. It will have different functions and looks with attribute mutation.

  ```html
  <uni-chained-select-field>
    <script type="application/json">
      {
        "tree": [
          {
            "content": "Mac",
            "value": "Mac",
            "children": [
              {
                "content": "MacBook Neo",
                "value": "MacBook Neo",
                "children": [
                  {
                    "content": "Silver",
                    "value": "MacBook Neo - Silver"
                  },
                  {
                    "content": "Blush",
                    "value": "MacBook Neo - Blush"
                  },
                  {
                    "content": "Citrus",
                    "value": "MacBook Neo - Citrus"
                  },
                  {
                    "content": "Indigo",
                    "value": "MacBook Neo - Indigo"
                  }
                ]
              },
              {
                "content": "MacBook Air",
                "value": "MacBook Air",
                "children": [
                  {
                    "content": "Sky Blue",
                    "value": "MacBook Air - Sky Blue"
                  },
                  {
                    "content": "Silver",
                    "value": "MacBook Air - Silver"
                  },
                  {
                    "content": "Starlight",
                    "value": "MacBook Air - Starlight"
                  },
                  {
                    "content": "Midnight",
                    "value": "MacBook Air - Midnight"
                  }
                ]
              },
              {
                "content": "MacBook Pro",
                "value": "MacBook Pro",
                "children": [
                  {
                    "content": "Space Black",
                    "value": "MacBook Pro - Space Black"
                  },
                  {
                    "content": "Silver",
                    "value": "MacBook Pro - Silver"
                  }
                ]
              },
              {
                "content": "iMac",
                "value": "iMac",
                "children": [
                  {
                    "content": "Blue",
                    "value": "iMac - Blue"
                  },
                  {
                    "content": "Purple",
                    "value": "iMac - Purple"
                  },
                  {
                    "content": "Pink",
                    "value": "iMac - Pink"
                  },
                  {
                    "content": "Orange",
                    "value": "iMac - Orange"
                  },
                  {
                    "content": "Yellow",
                    "value": "iMac - Yellow"
                  },
                  {
                    "content": "Green",
                    "value": "iMac - Green"
                  },
                  {
                    "content": "Silver",
                    "value": "iMac - Silver"
                  }
                ]
              },
              {
                "content": "Mac mini",
                "value": "Mac mini",
                "children": [
                  {
                    "content": "M6 chip",
                    "value": "Mac mini - M6 chip"
                  },
                  {
                    "content": "M5 Pro chip",
                    "value": "Mac mini - M5 Pro chip"
                  }
                ]
              },
              {
                "content": "Mac Studio",
                "value": "Mac Studio",
                "children": [
                  {
                    "content": "M5 Max chip",
                    "value": "Mac Studio - M5 Max chip"
                  },
                  {
                    "content": "M5 Ultra chip",
                    "value": "Mac Studio - M5 Ultra chip"
                  }
                ]
              }
            ]
          },
          {
            "content": "iPad",
            "value": "iPad",
            "children": [
              {
                "content": "iPad Pro",
                "value": "iPad Pro",
                "children": [
                  {
                    "content": "Space Black",
                    "value": "iPad Pro - Space Black"
                  },
                  {
                    "content": "Silver",
                    "value": "iPad Pro - Silver"
                  }
                ]
              },
              {
                "content": "iPad Air",
                "value": "iPad Air",
                "children": [
                  {
                    "content": "Blue",
                    "value": "iPad Air - Blue"
                  },
                  {
                    "content": "Purple",
                    "value": "iPad Air - Purple"
                  },
                  {
                    "content": "Starlight",
                    "value": "iPad Air - Starlight"
                  },
                  {
                    "content": "Space Gray",
                    "value": "iPad Air - Space Gray"
                  }
                ]
              },
              {
                "content": "iPad",
                "value": "iPad Normal",
                "children": [
                  {
                    "content": "Blue",
                    "value": "iPad - Blue"
                  },
                  {
                    "content": "Pink",
                    "value": "iPad - Pink"
                  },
                  {
                    "content": "Yellow",
                    "value": "iPad - Yellow"
                  },
                  {
                    "content": "Silver",
                    "value": "iPad - Silver"
                  }
                ]
              },
              {
                "content": "iPad mini",
                "value": "iPad mini",
                "children": [
                  {
                    "content": "Blue",
                    "value": "iPad mini - Blue"
                  },
                  {
                    "content": "Purple",
                    "value": "iPad mini - Purple"
                  },
                  {
                    "content": "Starlight",
                    "value": "iPad mini - Starlight"
                  },
                  {
                    "content": "Space Gray",
                    "value": "iPad mini - Space Gray"
                  }
                ]
              }
            ]
          }
        ]
      }
    </script>

    <!-- select -->
    <uni-select-field slot="select" subject="Apple">
      <select slot="select" name="my-select">
        <option value="" disabled selected>Please select product</option>
      </select>
    </uni-select-field>
  </uni-chained-select-field>
  ```

## JavaScript Instantiation

&lt;uni-chained-select-field /> could also use JavaScript to create DOM element. Here comes some examples.

```html
<script type="module">
import { UniChainedSelectField } from 'https://unpkg.com/uni-chained-select-field/mjs/wc-uni-chained-select-field.js';

const selectTemplate = document.querySelector('.my-select-template');

// use DOM api
const nodeA = document.createElement('uni-chained-select-field');
nodeA.appendChild(selectTemplate.content.cloneNode(true));
document.body.appendChild(nodeA);
nodeA.tree = [
  {
    content: "iPhone",
    value: "iPhone",
    children: [
      {
        "content": "iPhone Duo",
        "value": "iPhone Duo"
      },
      {
        "content": "iPhone 18 Pro",
        "value": "iPhone 18 Pro"
      }
    ]
  },
  {
    content: "Vision Pro",
    value: "Vision Pro"
  }
];

// new instance with Class
const nodeB = new UniChainedSelected();
nodeB.appendChild(selectTemplate.content.cloneNode(true));
document.body.appendChild(nodeB);
nodeB.tree = [
  {
    content: "iPhone",
    value: "iPhone",
    children: [
      {
        "content": "iPhone Duo",
        "value": "iPhone Duo"
      },
      {
        "content": "iPhone 18 Pro",
        "value": "iPhone 18 Pro"
      }
    ]
  },
  {
    content: "Vision Pro",
    value: "Vision Pro"
  }
];
</script>
```

## Style Customization

Developers could apply styles to decorate &lt;uni-input-field />'s looking.

```html
<style>
uni-chained-select-field {
  --unichained-select-field-max-column-block-size: 231px;
  --unichained-select-field-list-position-area: bottom span-all;
}
</style>
```


## Attribute

&lt;uni-chained-select-field /> component exposes a curated set of attributes, enabling developers to dynamically adjust the user interface. This provides the flexibility to tailor the component’s appearance to seamlessly adapt to any given context.

- **tree**

  Defines the hierarchical dataset for the cascader options list. Expects a JSON-serialized string representing an array of node objects to construct the multi-tiered selection tree.

  ```html
  <uni-chained-select-field
    tree='[{"content":"iPhone","value":"iPhone"},{"content":"iPad","value":"iPad"}]'
  >
    ...
  </uni-chained-select-field>
  ```

## Properties

| Property Name | Type | Description |
| ----------- | ----------- | ----------- |
| tree | Array | Sets or returns the hierarchical dataset for the cascader options list. Expects an array of node objects used to construct and render the multi-tiered selection tree. |
| values | Array | Returns a read-only array representing the resolved path of selected node objects from the root to the currently chosen leaf. Useful for retrieving the complete hierarchical selection chain. |

## Event
| Event Signature | Description |
| ----------- | ----------- |
| uni-chained-select-field-pick | Dispatched when a user selects a leaf option with no children. Developers can retrieve the complete selection path via the values property. |

## Method
| Mathod Signature | Description |
| ----------- | ----------- |
| showPopover() | Shows the options list of &lt;uni-chained-select-field />. |
| hidePopover() | Hides the options list of &lt;uni-chained-select-field />. |
| togglePopover(force) | Toggles the visibility of the options list. The optional force parameter allows you to explicitly show (`true`) or hide (`false`) the popover. |
| refresh() | Re-synchronizes and rebuilds the hierarchical options list. Useful when developers dynamically mutate the slotted <select /> options or update the underlying dataset at runtime. |

## Reference
- [&lt;uni-chained-select-field /> demo](https://blog.lalacube.com/mei/webComponent_uni-chained-select-field.html)
- [YouTube tutorial](https://youtube.com/shorts/RofNmL-vXAQ)
- [&lt;uni-select-field />](https://github.com/meistudioli/uni-select-field)
- [position-area](https://chrome.dev/anchor-tool/)
