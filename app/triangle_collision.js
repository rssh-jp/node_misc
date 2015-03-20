'use strict';

var Vector = require('vector');

var INNER_TYPE = {
    INSIDE : 0,
    CROSS : 1,
    OUTSIDE : 2,
};
INNER_TYPE.toString = function(type){
    switch(type){
    case INNER_TYPE.INSIDE:  return     'INSIDE'; break;
    case INNER_TYPE.CROSS:  return      'CROSS'; break;
    case INNER_TYPE.OUTSIDE:  return    'OUTSIDE'; break;
    }
};

var Triangle = function(){
    this.pos1 = null;
    this.pos2 = null;
    this.pos3 = null;
    this.set = function(pos1, pos2, pos3){
        this.pos1 = pos1;
        this.pos2 = pos2;
        this.pos3 = pos3;
    };
    this.setList = function(list){
        this.pos1 = new Vector(list[0], list[1], 0);
        this.pos2 = new Vector(list[2], list[3], 0);
        this.pos3 = new Vector(list[4], list[5], 0);
    };
    this.get1SideVector = function(){
        return this.pos1.sub(this.pos2);
    };
    this.get2SideVector = function(){
        return this.pos2.sub(this.pos3);
    };
    this.get3SideVector = function(){
        return this.pos3.sub(this.pos1);
    };
    this.isInnerVector = function(v){
        var v1 = this.pos1.sub(v);
        var v2 = this.pos2.sub(v);
        var v3 = this.pos3.sub(v);
        var wk1 = this.get1SideVector();
        var wk2 = this.get2SideVector();
        var wk3 = this.get3SideVector();
        var c1 = v1.cross(wk1).normalize();
        var c2 = v2.cross(wk2).normalize();
        var c3 = v3.cross(wk3).normalize();
        var d1 = c1.dot(c2);
        var d2 = c2.dot(c3);
        var d3 = c3.dot(c1);
        var sum = d1 + d2 + d3;
        if(sum === 3){
            return true;
        }
        return false;
    };
    this.getInnerType = function(triangle){
        var is1in = this.isInnerVector(triangle.pos1);
        var is2in = this.isInnerVector(triangle.pos2);
        var is3in = this.isInnerVector(triangle.pos3);
        if(is1in && is2in && is3in){
            return INNER_TYPE.INSIDE;
        }
        else if(is1in || is2in || is3in){
            return INNER_TYPE.CROSS;
        }
        return INNER_TYPE.OUTSIDE;
    };
};

var getTriangleInnerType = function(t1, t2){
    var inner_type = t1.getInnerType(t2);
    if(inner_type !== INNER_TYPE.OUTSIDE){
        return inner_type;
    }
    var inner_type2 = t2.getInnerType(t1);
    return inner_type2;
};

var main = function(){
    var list = [
        {
            tri1 : '1,4 2,-2 3,1',
            tri2 : '2,4 3,8 5,5',
        },
        {
            tri1 : '1,2 8,2 4,9',
            tri2 : '3,6 4,3 5,6',
        },
        {
            tri1 : '-2,3 3,1 3,7',
            tri2 : '2,3 2,-2 6,3',
        },
        {
            tri1 : '-1,6 2,1 4,5',
            tri2 : '2,-1 4,3 6,-3',
        },
    ];
    var strToTriangle = function(str){
        var split = str.split(' ');
        var s1 = split[0].split(',');
        var s2 = split[1].split(',');
        var s3 = split[2].split(',');
        var p1 = new Vector(s1[0], s1[1], 0);
        var p2 = new Vector(s2[0], s2[1], 0);
        var p3 = new Vector(s3[0], s3[1], 0);
        var triangle = new Triangle();
        triangle.set(p1, p2, p3);
        return triangle;
    };
    for(var i=0; i<list.length; i++){
        var val = list[i];
        var t1 = strToTriangle(val.tri1);
        var t2 = strToTriangle(val.tri2);
        console.log('【テストデータ' + (i + 1) + '：入力】');
        console.log(val.tri1);
        console.log(val.tri2);
        console.log('【出力】');
        console.log(INNER_TYPE.toString(getTriangleInnerType(t1, t2)).toLowerCase());
    }
};
main();


