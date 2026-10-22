import test from 'node:test';
import assert from 'node:assert/strict';
import { research, sections, selectFindings } from '../src/data/research.js';
test('research references are valid and claims are traceable',()=>{
 for(const collection of [research.interviews,research.roles,research.findings]) assert.equal(new Set(collection.map(x=>x.id)).size,collection.length);
 for(const f of research.findings){
  assert.ok(sections.some(s=>s.id===f.section));
  assert.ok(['confirmed','hypothesis'].includes(f.status));
  assert.equal(f.cells.length,3);
  assert.ok(f.title);
  assert.ok(f.roleIds.every(id=>research.roles.some(r=>r.id===id)));
  assert.ok(f.evidence.length>0,'Every finding needs evidence');
  for(const e of f.evidence){assert.ok(e.quote&&e.locator);assert.ok(research.interviews.some(i=>i.id===e.interviewId&&/^(https?:\/\/|\/sources\/)/.test(i.url)));}
 }
});
test('role, status, section and text filters compose',()=>{
 const data={findings:[{id:'a',section:'users',roleIds:['one'],status:'confirmed',title:'Задача',cells:['Анализ','','']},{id:'b',section:'needs',roleIds:['two'],status:'hypothesis',title:'Данные',cells:['','','']}]};
 assert.deepEqual(selectFindings(data,'users','one','confirmed','АНАЛИЗ').map(x=>x.id),['a']);
 assert.equal(selectFindings(data,'users','two','','').length,0);
 assert.equal(selectFindings(data,'users','','hypothesis','').length,0);
});
