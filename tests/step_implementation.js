/* globals gauge*/
"use strict";
const path = require('path');
const {
    openBrowser,
    write,
    closeBrowser,
    goto,
    press,
    screenshot,
    above,
    click,
    checkBox,
    listItem,
    toLeftOf,
    link,
    text,
    into,
    textBox,
    evaluate,
    openTab,
    button,
    $,
    closeTab,
    waitFor,
    below,
    toRightOf,
    within,
    dismiss
} = require('taiko');
const assert = require("assert");
const headless = process.env.headless_chrome.toLowerCase() === 'true';

beforeSuite(async () => {
    await openBrowser({
        headless: headless
    })
});

afterSuite(async () => {
    await waitFor(20000);//delay
    await closeBrowser();
});

// Return a screenshot file name
gauge.customScreenshotWriter = async function () {
    const screenshotFilePath = path.join(process.env['gauge_screenshots_dir'],
        `screenshot-${process.hrtime.bigint()}.png`);

    await screenshot({
        path: screenshotFilePath
    });
    return path.basename(screenshotFilePath);
};

step("Add task <item>", async (item) => {
    await write(item, into(textBox("What needs to be done?")));
    await press('Enter');
});

step("View <type> tasks", async function (type) {
    await click(link(type));
});

step("Complete tasks <table>", async function (table) {
    for (var row of table.rows) {
        await click(checkBox(toLeftOf(row.cells[0])));
    }
});

step("Clear all tasks", async function () {
    await evaluate(() => localStorage.clear());
});

step("Open todo application", async function () {
    await goto("todo.taiko.dev");
});

step("Must not have <table>", async function (table) {
    for (var row of table.rows) {
        assert.ok(!await text(row.cells[0]).exists(0, 0));
    }
});

step("Must display <message>", async function (message) {
    assert.ok(await text(message).exists(0, 0));
});

step("Add tasks <table>", async function (table) {
    for (var row of table.rows) {
        await write(row.cells[0]);
        await press('Enter');
    }
});

step("Must have <table>", async function (table) {
    for (var row of table.rows) {
        assert.ok(await text(row.cells[0]).exists());
    }
});

// ShareMEData Login

step("Sing in entity", async function () {
    await openTab('delta.sharemedata.com');
    // await write("cidarandresdac@gmail.com", into(textBox(below("Correo Electrónico"))));
	await write("pasantia@smd.com", into(textBox({id:'email'})));
	await write("Control123!", into(textBox({id:'password'})));
	await click(button({id:'login-button'}))
    //await click("Entrar")
	// await click($(`#header-option-logout`,near('SALIR')));
	await click($(`#header-option-logout`));
    await closeTab();
});
//physician
step("Sing in as physician", async function () {
    await goto('gamma.sharemedata.com');
    // await write("cidarandresdac@gmail.com", into(textBox(below("Correo Electrónico"))));
	await write("cidarandresdac@gmail.com", into(textBox({id:'email'})));
	await write("ch3ng3m3", into(textBox({id:'password'})));
	await click(button({id:'login-button'}))
    //await click("Entrar")
	//await click($(`#header-option-logout`,near('SALIR')));
	//await click($(`#header-option-logout`));
});
//table
step("Sing in <table>", async function (table) {
    await goto('delta.sharemedata.com');
    for (var row of table.rows) {
    // await write("cidarandresdac@gmail.com", into(textBox(below("Correo Electrónico"))));
	await write(row.cells[0], into(textBox({id:'email'})));
	await write(row.cells[1], into(textBox({id:'password'})));
	await click(button({id:'login-button'}))
	// await click($(`#header-option-logout`,near('SALIR')));
	await click($(`#header-option-logout`));
    }
   // await closeTab();
});
//Search a patient
step("Search", async function () {
    //await click("Elija un paciente");
    await click($(`#mat-select-value-1`));
    await write("Cidar3");
    await waitFor(1000);
    await press('Enter');
});

//Create a new template of record
step("Create template", async function () {
    //await click("Elija un paciente");
    await click("Ninguna");
    await waitFor(1000);
    await click("Cidar Chequeo General Día 1", below("Ninguna"));
    //await press('Enter');
});

//Add medicine in the table
step("Add medicine", async function () {
    
    //await click("Elija un paciente");
    await click("Adicionar");
    await waitFor(1000);
    await write("1", into(textBox("Descripción",toRightOf("1"))));
    await click($(`#record-option-save`));
    await waitFor(1000);
    //await press('Enter');
});
//Print pre view of the record
step("Print view", async function () {
    await click($(`#record-option-dots`));
    await waitFor(1000);
    await click($(`#record-option-print`));
    await waitFor(1000);
   // await click({x : 1550, y : 823});

    //1550, 823
    //await dismiss();
    //await press('Enter');
});