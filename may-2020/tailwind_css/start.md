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
