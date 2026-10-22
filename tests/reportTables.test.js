import test from 'node:test';
import assert from 'node:assert/strict';
import {reportTables,filterRecords} from '../src/data/reportTables.js';
test('future report sections have agreed structures and no research results',()=>{
 for(const [id,count] of Object.entries({needs:4,barriers:4,scenarios:5,recommendations:4})){
  assert.equal(reportTables[id].columns.length,count);
  assert.equal(reportTables[id].records.length,0);
  assert.ok(reportTables[id].details.length>=5);
 }
});
test('multiple needs for one role remain separate and filters compose',()=>{
 const records=[{id:'one',role:'A',task:'Alpha',category:'revision'},{id:'two',role:'A',task:'Beta',category:'validation'},{id:'three',role:'B',task:'Gamma',category:'revision'}];
 const columns=[{key:'task'}];
 assert.deepEqual(filterRecords(records,columns,{role:'A'}).map(r=>r.id),['one','two']);
 assert.deepEqual(filterRecords(records,columns,{role:'A',query:'BETA',category:'validation'}).map(r=>r.id),['two']);
 assert.equal(filterRecords(records,columns,{role:'A',category:'supported'}).length,0);
});
