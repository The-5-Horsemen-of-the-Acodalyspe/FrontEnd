#!/usr/bin/env node
const express=require('express');
let app=express();
app.use(express.static(process.argv[2]));
app.listen(3000);

