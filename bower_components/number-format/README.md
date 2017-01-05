# &lt;number-format&gt;

> A custom element that uses the library Accounting.js

## Demo

[Check it live!](http://obetomuniz.github.io/number-format)

## Install

Install the component using [Bower](http://bower.io/):

```sh
$ bower install number-format --save
```

Or [download as ZIP](https://github.com/obetomuniz/number-format/archive/master.zip).

## Usage

1. Import Web Components' polyfill:

    ```html
    <script src="bower_components/platform/platform.js"></script>
    ```

2. Import Custom Element:

    ```html
    <link rel="import" href="bower_components/number-format/src/number-format.html">
    ```

3. Start using it!

    ```html
    <number-format></number-format>
    ```

## Options

Attribute     | Options     | Default      | Description
---           | ---         | ---          | ---
`type`         | *string*    | `number`        | This attribute change the format (number, money, column, tofixed, unformat)
`symbol`         | *string*    | `$`        | This attribute change the symbol (e.g. type:money)
`format`         | *string*    | `%s%v`        | Regex to control output.
`decimal`         | *string*    | `.`        | Decimal point separator.
`thousand`         | *string*    | `,`        | Thousand separator.
`precision`         | *number*    | `0`        | Decimal places.

## Development

In order to run it locally you'll need to fetch some dependencies and a basic server setup.

* Install [Bower](http://bower.io/) & [Grunt](http://gruntjs.com/):

    ```sh
    $ [sudo] npm install -g bower grunt-cli
    ```

* Install local dependencies:

    ```sh
    $ bower install && npm install
    ```

* To test your project, start the development server and open `http://localhost:8000`.

    ```sh
    $ grunt server
    ```

* To provide a live demo, send everything to `gh-pages` branch.

    ```sh
    $ grunt deploy
    ```

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## History

For detailed changelog, check [Releases](https://github.com/obetomuniz/number-format/releases).

## License

[MIT License](http://opensource.org/licenses/MIT)
