import { Component, OnInit, Input } from '@angular/core';

export abstract class Chart {
    @Input() dataInput: any;

    constructor(){};

    abstract init(): void;
}
