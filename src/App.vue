<template>
    <body>
    <div id="app">
        <router-view></router-view>
    </div>
    </body>
</template>



<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}

body {
    background: black;
}
p {
    color:white;
}
label {
    color: white;
}
td {
    height: 33px;
    font-size: 17px;
    border-left: 2px solid #f890b6;
    border-right: 2px solid #f890b6;
    border-top: 2px solid #f890b6
}
table{
    height: 27px;
    border-collapse:collapse;
    width: 100%;
    table-layout:fixed;
    overflow: hidden;
    color: white;

}
</style>
