namespace Utils {
    function dispatchToAllWindows(event: Event): void;

    /**
     * Converts an arrayLike object into an array.
     */
    function toArray<T>(arrayLike: ArrayLike<T>): T[];

    /**
     * Determines if the window is running in an iframe.
     */
    function inIframe(): boolean;

    /**
     * Creates a div element with the given classes.
     */
    function createDiv(...classList: string[]): HTMLDivElement;

    /**
     * Gets the given percentage of the virtual height, suffixed with "px".
     */
    function getVh(percent: number): string;

    /**
     * Gets the size in pixels adapted to the virtual height.
     * Internally it seems the application works with 1080px.
     */
    function getSize(px: number): number;

    /**
     * Gets the given percentage of the virtual height.
     */
    function getVhNumber(percent: number): number;

    function getScreenRatio(): number;

    /**
     * Gets the screen height of the window.
     */
    function getVirtualHeight(): number;

    /**
     * Determines if the scroll bar is visible for the given element.
     */
    function scrollbarVisible(element: Element): boolean;

    /**
     * Gets a CSS URL string, where any \ in the the url parameter is replaced with / and the URL is prefixed with
     * the given prefix.
     */
    function getExternalImageUrl(url: string, prefix?: string): string;

    /**
     * Returns the remainder of one number divided by another.
     */
    function Modulo(num: number, mod: number): number;

    /**
     * Returns the number with as many "0" prefixes as needed to get to a string of the given length.
     */
    function pad(num: number | string, length: number): string;

    function replace_nth(str: string, find: string, replace: string, index: number): string;

    function forceParagraphLines(text: string, n?: number): string;

    /**
     * Replaces dashes followed by lowercase characters with a uppercase characters.
     * @example
     * // returns "someTextThing".
     * dashToCamelCase('some-text-thing');
     */
    function dashToCamelCase(str: string): string;

    /**
     * Does absolutely nothing useful.
     */
    function timeLine(str?: any): void;

    /**
     * Converts a given time to seconds.
     * @example
     * // returns 4230.
     * DisplayTimeToSeconds("01:10:30");
     * // returns 4200.
     * DisplayTimeToSeconds("01:10");
     * // returns 3600.
     * DisplayTimeToSeconds("1");
     */
    function DisplayTimeToSeconds(str: string): number;

    /**
     * Determines if the given URLs are equal. Internally, coui://html_ui and coui://html_UI are removed and only
     * then equality is determined.
     */
    function urlEqual(url1: string | void, url2: string): boolean;

    /**
     * Removes all children of the given node.
     */
    function RemoveAllChildren(elem: Node): void;

    /**
     * Formats the given number to a localized string.
     */
    function formatNumber(value: number, integer?: boolean): string;

    /**
     * Formats the given number as an (localized???) integer.
     */
    function formatInteger(value: number): string;

    /**
     * Returns a number limited to the given range.
     * @param value The preferred value.
     * @param min The lower boundary.
     * @param max The upper boundary.
     * @returns min <= returnValue <= max.
     */
    function Clamp(value: number, min: number, max: number): number;

    function Loop(n: number, min: number, max: number): number;

    /**
     * Determines if the given node is hidden through style.display "none". When recurs is true,
     * also determines if parents of the given node are hidden.
     */
    function isHidden(elem: Node | void, recurs: boolean): boolean;

    /**
     * Determines if the given element is visible.
     */
    function isVisible(elem: Element): boolean;

    /**
     * Converts a string representing a boolean to a boolean.
     * @example
     * // Returns true.
     * strToBool("TRUE");
     * strToBool("true");
     * // Returns false.
     * strToBool("FALSE");
     * strToBool("false");
     * strToBool("unicorns and rainbows");
     */
    function strToBool(value: string): boolean;

    /**
     * Filters the given input element with the given filter. When the filter returns true, the value is accepted,
     * when it returns false, the previous input element's value is set.
     */
    function setInputFilter(inputElement: HTMLInputElement | HTMLTextAreaElement,
                            inputFilter: (value: string) => boolean): void;

    /**
     * Determines if the given string value is a number.
     */
    function isNumeric(value: string): boolean;

    /**
     * Determines if the given string value is a number. Warning: the implementation also considers "10.5" to be
     * an integer.
     */
    function isInteger(value: string): boolean;

    function SmoothPow(origin: number, destination: number, smoothFactor: number, dTime: number): number;

    function SmoothLinear(origin: number, destination: number, smoothFactor: number, dTime: number): number;

    function SmoothSin(origin: number, destination: number, smoothFactor: number, dTime: number): number;

    /**
     * Removes all elements from the given node.
     */
    function ClearIframe(elem: Node): void;

    /**
     * Randomly generates a GUID-like string.
     */
    function generateGUID(): string;

    /**
     * Determines if the value contains shouldContain. Does so case-insensitive and trimming any whitespace.
     */
    function containStr(shouldContain: string, value: string): boolean;

    function getCaretPosition(control: HTMLInputElement | HTMLTextAreaElement): number;

    function setCaretPosition(control: HTMLInputElement | HTMLTextAreaElement, position: number): void;

    /**
     * Generates a random name between 4 and 19 characters long.
     */
    function generateRandomName(): string;

    /**
     * Generates a lorem ipsum text of the given length.
     */
    function generateLorem(length: number): string;

    /**
     * Removes "bitch", "shit", and "asshole" from the given string.
     */
    function filterProfanity(value: string): string;

    function Translate(key: string): string | null;

    function SetTextVariable(varName: string, value: string): void;

    /**
     * Converts the given totalSeconds to a duration string. Currently it is unknown how this differs from
     * SecondsToDisplayTime.
     * @param totalSeconds The total number of seconds to calculate a duration string for.
     * @param withMinutes Whether or not the return value should contain minutes, when false also excludes seconds,
     * e.g. 3740 seconds becomes: "01".
     * @param withSeconds Whether or not the return value should contain seconds, when false 3740 seconds
     * becomes: "01:02".
     * @param doLocalize Whether or not to localize the string, defaults to true.
     */
    function SecondsToDisplayDuration(totalSeconds: number, withMinutes: boolean, withSeconds: boolean,
                                      doLocalize?: boolean): string;

    /**
     * Converts the given totalSeconds to a time string. Currently it is unknown how this differs from
     * SecondsToDisplayDuration.
     * @param totalSeconds The total number of seconds to calculate a time string for.
     * @param withMinutes Whether or not the return value should contain minutes, when false also excludes seconds,
     * e.g. 3740 seconds becomes: "01".
     * @param withSeconds Whether or not the return value should contain seconds, when false 3740 seconds
     * becomes: "01:02".
     * @param doLocalize Whether or not to localize the string, defaults to true.
     */
    function SecondsToDisplayTime(totalSeconds: number, withMinutes: boolean, withSeconds: boolean,
                                  doLocalize?: boolean): string;

    /**
     * Converts the given hours, minutes and seconds to a time string: "hh:mm:ss".
     * When minutes < 0: "hh". When seconds < 0: "hh:mm".
     */
    function timeToString(hours: number, minutes: number, seconds: number): string;

    /**
     * Determines whether a file by the given fileName exists.
     */
    function doesFileExist(fileName: string): boolean;

    /**
     * Loads the contents of the given file and provides it through the successCallback.
     */
    function loadFile(fileName: string, successCallback: (contents: string) => void): void;

    /**
     * Clones the given object using JSON stringify and parse.
     */
    function slowDeepClone(object: any): any;

    function showTooltip(id: string, tooltip: string, posXRel: number, posYRel: number, maxWidth?: number): void;

    function hideTooltip(id: string): void;

    /**
     * Adds leading (and trailing) zeros to the given value.
     * @param value The numeric value to add zeros to.
     * @param nbDigits The minimum number of digits before the decimal separator.
     * @param pointFixed The minimum number of digits after the decimal separator.
     */
    function leadingZeros(value: number, nbDigits: number, pointFixed?: number): string;

    /**
     * Counts the number of digits after the decimal separator.
     */
    function countDecimals(value: number | string): number;
}