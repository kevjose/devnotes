# Tailwind css

## Background classes and shades

- `.bg-{color}-{shade}`
- black, white no shades
- gray, red, orange, yellow, green, teal, indigo, blue, purple, pink (shades from 100 to 900)

## Element sizing and tailwind's numbering system

- element sizing is done with rem
- 1rem = document base font, if base font is 16px then 1 rem = 16px
- 1rem = 4 in tailwind
- 1.25rem = 5
- `{w|h}-{size}`
- Available sizes in REM
- 0, 1, 2, 3, 4, 5, 6, 8, 10, 12,16, 20, 24, 32, 40, 48, 56, 64,
- Sizing in percentages,1/2... 1/{3, 4, 5, 6, 12)
- Sizing utilities screen, full

```html
<html>
  <head>
    <link
      href="https://unpkg.com/tailwindcss@^1.0/dist/tailwind.min.css"
      rel="stylesheet"
    />
  </head>
  <body class="">
    <div class="bg-gray-500 w-32 h-32">Text</div>

    <div class="bg-gray-800 w-3/12">Text</div>
    <div class="bg-red-800 w-3/12">Text</div>
    <div class="bg-orange-800 w-6/12">Text</div>
  </body>
</html>
```

## Shades of blue

```html
<html>
  <head>
    <link
      href="https://unpkg.com/tailwindcss@^1.0/dist/tailwind.min.css"
      rel="stylesheet"
    />
  </head>
  <body class="bg-gray-200">
    <div class="w-5 h-6 bg-blue-100">Text</div>
    <div class="w-5 h-6 bg-blue-200">Text</div>
    <div class="w-5 h-6 bg-blue-300">Text</div>
    <div class="w-5 h-6 bg-blue-400">Text</div>
    <div class="w-5 h-6 bg-blue-500">Text</div>
    <div class="w-5 h-6 bg-blue-600">Text</div>
    <div class="w-5 h-6 bg-blue-700">Text</div>
    <div class="w-5 h-6 bg-blue-800">Text</div>
    <div class="w-5 h-6 bg-blue-900">Text</div>
  </body>
</html>
```

## Padding and margins

- `{p|m}-{size}`
- `{p|m{l|t|r|b}}-{size}`
- `{p|m{x|y}}-{size}`
- .p-\* {}
- .m-\* {}
- .p{x, y}-\* {}
- .m{x, y}-\* {}

```html
<html>
  <head>
    <link
      href="https://unpkg.com/tailwindcss@^1.0/dist/tailwind.min.css"
      rel="stylesheet"
    />
  </head>
  <body>
    <div class="bg-blue-800 w-32 h-32 mb-4 pt-4 px-2">
      Text Text Text Text Text Text Text Text Text Text Text
    </div>
    <div class="bg-blue-500 w-32 h-32 p-4">Text</div>
  </body>
</html>
```

## Styling text part 1

- font family `.font-{family}`
- families, sans, serif, mono
- Fonts
- .font-sans {} // Helvetica or similar
- .font-serif {} // Times New Roman or similar
- .font-mono {} // Monospace or similar
- Sizing
- .text-xs {} // .75rem; 12px
- .text-sm {} // .875rem;
- .text-base {} // 1rem;
- .text-lg {} // 1.125rem;
- .text-xl {} // 1.25rem;
- .text-2xl {} // 1.5rem;
- .text-3xl {} // 1.875rem;
- .text-4xl {} // 2.25rem;
- .text-5xl {} // 3rem;
- .text-6xl {} // 4rem;
  Text Align
- .text-left {}
- .text-center {}
- .text-right {}
- .text-justify {}
- Text Color
- .text-{color}-{shade (100-900)} {}

```html
<html>
  <head>
    <link
      href="https://unpkg.com/tailwindcss@^1.0/dist/tailwind.min.css"
      rel="stylesheet"
    />
  </head>
  <body class="font-sans">
    <p class="text-xs text-center m-3 p-5 bg-gray-900 text-gray-500">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam suscipit
      orci ac nisl varius varius. Nullam auctor finibus pulvinar. Morbi
      porttitor placerat enim nec consequat.
    </p>
  </body>
</html>
```

## styling text part 2

- Styling
- .italic {}
- .not-italic {}
- Font Weight (Bold) `.font-{weight}`
- .font-hairline {} // 100
- .font-thin {} // 200
- .font-light {} // 300
- .font-normal {} // 400
- .font-medium {} // 500
- .font-semibold {} // 600
- .font-bold {} // 700
- .font-extrabold {} // 800
- .font-black {} // 900
- Letter Spacing `.tracking-{spacing}` measured in `em`, uses parents elements font size not the document
- .tracking-tighter {} // -0.05em
- .tracking-tight {} // -0.025em
- .tracking-normal {} // 0
- .tracking-wide {} // 0.025em
- .tracking-wider {} // 0.05em
- .tracking-widest {} // 0.1em
- Line Height/Spacing `.leading-{spacing}`, line height
- .leading-none {} // 1
- .leading-tight {} // 1.25
- .leading-snug {} // 1.375
- .leading-normal {} // 1.5
- .leading-relaxed {} // 1.625
- .leading-loose {} // 2
- Text Decorations
- .underline {}
- .line-through {}
- .no-underline {}
- Text Transform
- .uppercase {}
- .lowercase {}
- .capitalize {}
- .normal-case {}

```html
<html>
  <head>
    <link
      href="https://unpkg.com/tailwindcss@^1.0/dist/tailwind.min.css"
      rel="stylesheet"
    />
  </head>
  <body>
    <p class="italic tracking-tight capitalize">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam suscipit
      orci ac nisl varius varius.
      <span class="font-black underline normal-case"
        >Nullam auctor finibus pulvinar.</span
      >
      Morbi porttitor placerat enim nec consequat.
    </p>
  </body>
</html>
```

## Text styling challenge

```html
<html>
  <head>
    <link
      href="https://unpkg.com/tailwindcss@^1.0/dist/tailwind.min.css"
      rel="stylesheet"
    />
  </head>
  <body>
    <!-- Title case heading 1 text in dark gray -->
    <h1 class="capitalize text-xl text-gray-900">
      Lorem ipsum dolor sit amet consectetur.
    </h1>

    <!-- Paragraph styling with 1.5 line heights & letter spacing -->
    <p class="mt-3 leading-loose tracking-wide">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam suscipit
      orci ac nisl varius varius. Nullam auctor finibus pulvinar. Morbi
      porttitor placerat enim nec consequat.
    </p>

    <!-- Treated like a quote with a background and plenty of padding. Italic title -->
    <div class="m-2 p-6 bg-blue-900 text-blue-200">
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam suscipit
        orci ac nisl varius varius. Nullam auctor finibus pulvinar. Morbi
        porttitor placerat enim nec consequat.
      </p>
      <p class="mt-3 text-gray-400">
        - Victor Gonzalez, <span class="italic">instructor</span>
      </p>
    </div>

    <!-- Call to action button, blue with good padding and uppercase -->
    <button class="uppercase bg-blue-500 text-blue-100 px-4 py-3">
      Enroll Now
    </button>
  </body>
</html>
```

## Borders

- `.border-{thickness}`
- .border {} // 1px
- .border-0 {} // 0
- .border-2 {} // 2px
- .border-4 {} // 4px
- .border-8 {} // 8px
- Modifiers
- .border-{t, b, l, r}-{thickness}, `border-{side}-{thickness}`
- Colors
- .border-{color}-{shade (100-900)}
- Border Style
- .border-solid {}
- .border-dashed {}
- .border-dotted {}
- .border-double {}
- .border-none {}
- Border Radius
- .rounded-none {} // 0
- .rounded-sm {} // .125rem
- .rounded {} // .25rem
- .rounded-lg {} // .5rem
- .rounded-full {} // 9999px
- rounded-{side{t,r,b,l,tl,tr,br,bl}}-{radius}

```html
<html>
  <head>
    <link
      href="https://unpkg.com/tailwindcss@^1.0/dist/tailwind.min.css"
      rel="stylesheet"
    />
  </head>
  <body>
    <div
      class="bg-gray-100 m-16 w-32 h-32 border border-blue-800 rounded-bl-full"
    >
      &nbsp;
    </div>
  </body>
</html>
```

## Button challenge

```html
<body>
  <!-- blue background, rounded, thick left border -->
  <div>
    <button
      class="m-4 bg-blue-800 py-2 px-4 text-gray-400
 text-sm rounded-lg border-l-8 border-blue-700"
    >
      Submit
    </button>
  </div>
  <!-- Red text, outlined -->
  <div>
    <button
      class="m-4 border-2 border-red-500 text-red-500
 rounded px-3 py-1"
    >
      Cancel
    </button>
  </div>
  <!-- light Indigo background, bottom border, indigo text -->
  <div>
    <button
      class="m-4 bg-indigo-200 border-b-4 border-t-4
 border-indigo-800 px-4 py-1"
    >
      Save
    </button>
  </div>
  <!-- Thick rounded, lots of padding, large button -->
  <div>
    <button
      class="m-4 rounded-full border-4 px-16 py-3
 uppercase font-bold text-sm bg-orange-600
 border-orange-800"
    >
      Buy Now
    </button>
  </div>
  <!-- Outlined, serif font, uppercase, rounded -->
  <div>
    <button
      class="m-4 border font-serif text-xs uppercase
 rounded-lg p-2"
    >
      Send Postcard
    </button>
  </div>
</body>
```

## Display modes

- most elements block elements, this can be changed using the display classes
- .block {} // block
- .inline-block {} // inline-block
- .inline {} // inline, no widths
- .flex {} // flex
- .inline-flex {} // inline-flex
- .table {} // table
- .table-row {} // table-row
- .table-cell {} // table-cell
- .hidden {} // none

```html
<html>
  <head>
    <link
      href="https://unpkg.com/tailwindcss@^1.0/dist/tailwind.min.css"
      rel="stylesheet"
    />
  </head>
  <body>
    <div>
      Hello
      <div class="bg-yellow-300 w-32 h-6 inline-block">World!</div>
    </div>
  </body>
</html>
```

## Flexbox

- tailwind uses flexbox for the layout of items on the document. Flexbox is a css property that defines a flex container. Once a container has been assigned as a flex container, we can use all the alignment utility classes to achieve the desired look
- .flex
- Use below if default direction horizontal alignment
- .justify-start
- .justify-center
- .justify-end
- .justify-between
- .justify-around
- Use below if default direction is vertical alignment
- .items-strech
- .items-start
- .items-center
- .items-end
- .items-baseline
- Flex direction
- .flex-row, default
- .flex-row-reverse
- .flex-col
- .flex-col-reverse
- Wrapping
- .flex-no-wrap
- .flex-wrap
- .flex-wrap-reverse

```html
<html>
  <head>
    <link
      href="https://unpkg.com/tailwindcss@^1.0/dist/tailwind.min.css"
      rel="stylesheet"
    />
  </head>
  <body>
    <!-- Example 1 -->
    <div class="h-screen flex flex-wrap-reverse">
      <div class="bg-yellow-600 w-16 h-16">1</div>
      <div class="bg-teal-700 w-16 h-16">2</div>
      <div class="bg-red-700 w-16 h-16">3</div>
      <div class="bg-yellow-600 w-16 h-16">1</div>
      <div class="bg-teal-700 w-16 h-16">2</div>
      <div class="bg-red-700 w-16 h-16">3</div>
      <div class="bg-yellow-600 w-16 h-16">1</div>
      <div class="bg-teal-700 w-16 h-16">2</div>
      <div class="bg-red-700 w-16 h-16">3</div>
      <div class="bg-yellow-600 w-16 h-16">1</div>
      <div class="bg-teal-700 w-16 h-16">2</div>
      <div class="bg-red-700 w-16 h-16">3</div>
      <div class="bg-yellow-600 w-16 h-16">1</div>
      <div class="bg-teal-700 w-16 h-16">2</div>
      <div class="bg-red-700 w-16 h-16">3</div>
      <div class="bg-yellow-600 w-16 h-16">1</div>
      <div class="bg-teal-700 w-16 h-16">2</div>
      <div class="bg-red-700 w-16 h-16">3</div>
    </div>

    <!-- Example 2 -->
    <!-- <div class="flex items-start">
            <div class="text-2xl bg-blue-500">&bull;</div>
            <p class="text-5xl ">Hello there.</p>
        </div> -->
  </body>
</html>
```

## Block gallery

```html
<html>
  <head>
    <link
      href="https://unpkg.com/tailwindcss@^1.0/dist/tailwind.min.css"
      rel="stylesheet"
    />
  </head>
  <body>
    <!-- Must take up all available space -->
    <!-- Evenly distributed 3x3 gird -->
    <!-- Letter to be centered on the square -->
    <!-- Must have space between blocks -->
    <div class="h-screen flex flex-wrap">
      <div class="flex w-1/3 h-1/3">
        <div class="bg-teal-100 m-2 w-full flex justify-center items-center">
          A
        </div>
      </div>
      <div class="flex w-1/3 h-1/3">
        <div class="bg-teal-200 m-2 w-full flex justify-center items-center">
          B
        </div>
      </div>
      <div class="flex w-1/3 h-1/3">
        <div class="bg-teal-300 m-2 w-full flex justify-center items-center">
          C
        </div>
      </div>
      <div class="flex w-1/3 h-1/3">
        <div class="bg-teal-400 m-2 w-full flex justify-center items-center">
          D
        </div>
      </div>
      <div class="flex w-1/3 h-1/3">
        <div class="bg-teal-500 m-2 w-full flex justify-center items-center">
          E
        </div>
      </div>
      <div class="flex w-1/3 h-1/3">
        <div class="bg-teal-600 m-2 w-full flex justify-center items-center">
          F
        </div>
      </div>
      <div class="flex w-1/3 h-1/3">
        <div class="bg-teal-700 m-2 w-full flex justify-center items-center">
          G
        </div>
      </div>
      <div class="flex w-1/3 h-1/3">
        <div class="bg-teal-800 m-2 w-full flex justify-center items-center">
          H
        </div>
      </div>
      <div class="flex w-1/3 h-1/3">
        <div class="bg-teal-900 m-2 w-full flex justify-center items-center">
          I
        </div>
      </div>
    </div>
  </body>
</html>
```

## Responsive design

- All modern applications should be able to responsively fit into the screen size. Tailwind is mobile first framework, meaning that all of the classes that we have talked about this far, are for mobile and trickle up to desktop. But we can change this with a couple of modifiers

- Default breakpoints
- [all] //0px
- .sm: //640px
- .md: //768px
- .lg: //1024
- .xl: //1280px
- Default responsive classes
- .sm:bg-\* //background-color
- .sm:w-\* // width
- .sm:h-\* //height
- .sm:p-\* //padding
- .sm:m-\* //margin
- .sm:font-sans // font family - sans, serif, mono
- .sm:text-lg // font size - xs, sm, base, lg, xl, {2-6}xl
- .sm:text-left // left, center, right, justify
- .sm:text-{color}-{shade (100,900)} // text-color
- .sm:font-bold //font-weight
- .sm:tracking-tighter //letter-spacing
- .sm:leading-tight //line-spacing/height
- .sm:uppercase // text-transform
- .sm:border-{color}-{shade (100-900)} // border color
- .sm:border-{style} // border-style
- .sm:border-{width} // border-width
- .sm:rounded-{size} // border-radius
- .sm:{display} // block, inline, flex, table, hidden
- .sm:flex // display flex
- .sm:flex-{col|row} // flex-direction
- styles cascades from mobile to desktop (stacked, not removed)

```html
<html>
  <head>
    <link
      href="https://unpkg.com/tailwindcss@^1.0/dist/tailwind.min.css"
      rel="stylesheet"
    />
  </head>
  <body class="bg-blue-500 flex flex-col sm:flex-row">
    <div class="w-32 h-32 bg-gray-200 border">A</div>
    <div class="w-32 h-32 bg-gray-200 border">B</div>
  </body>
</html>
```

## Hover modifier

- we can tap into the built in hver start in css using the `hover:` modifier along with any of the default classes to achieve interactive designs
- Default responsive classes
- .hover:bg-\* // background-color
- .hover:text-{color}-{shade(100-900)} // text-color
- .hover:font-bold // font-weight
- .hover:border-{color}-{shade(100-900)} // border color

## Focus modifier

- Adding a focus state is simple using the `.focus:` modifier along with any of the default classes provided by tailwind-css
- Default responsive classes
- .focus:bg-\* // background color
- .focus:text-{color}-{shade(100-900)} // text-color
- .focus:font-bold // font weight
- .focus:border-{color}-{shade(100-900)} // border-color

## combination modifiers

- Sometimes, the design may require 2 modifiers at the same time. For eg:, you may need to change the hover state of the background color but only in `md:` size. Let's explore how to achieve this
- .md:hover:bg-{color}-{shade(100-900)} // hover background color
- .md:focus:bg-{color}-{shade(100-900)} // focus background color
- .md:hover:text-{color}-{shade(100-900)} // hover text color
- .md:focu:text-{color}-{shade(100-900)} // focus text color

## Other utilities

- Box shadows - rsponsive, hover, focus states
- .shadow-{size} // md, lg, xl, 2xl, inner, outline, none
- Opacity - responsive hover, focus state
- .opacity-{percent} // 100, 75, 50, 25,0
- Cursor - responsive
- .cursor-style // default, pointer, wait, text, move, not-allowed
- Outline - focus
- .focus:outline-none // remove default browser outline styling
- use focus:shadow-outline instead for a nicer alternative
- user select - responsive
- .select-{style} // noen, text, all, auto
- screen readers -responsive , hover, focus, active
- .sr-only // visually hidden, present for screen readers
- .no-sr-only // undo .sr-only

## Input component

```html
<html>
  <head>
    <link
      href="https://unpkg.com/tailwindcss@^1.0/dist/tailwind.min.css"
      rel="stylesheet"
    />
  </head>
  <body
    class="h-screen flex flex-col justify-center items-start pl-10 w-1/3 bg-gray-300"
  >
    <label class="text-gray-700 text-sm font-bold select-none" for="full_name">
      Full Name
    </label>
    <input
      id="full_name"
      placeholder="Enter your full name"
      class="mt-2 shadow border rounded-lg w-4/6 px-3 py-2 text-gray-700 focus:shadow-outline focus:bg-blue-100 placeholder-indigo-300"
    />
    <button class="mt-2 px-3 py-2 bg-blue-900 text-blue-100 rounded-lg">
      Save
    </button>
  </body>
</html>
```
