import type { CollisionObject, CollisionKind } from '../../physics/collisions/types';
export interface CollisionPreset { id:string; name:string; kind:CollisionKind; restitution:number; a:CollisionObject; b:CollisionObject }
const pair=(id:string,name:string,kind:CollisionKind,e:number,mA:number,mB:number,uA:number,uB:number):CollisionPreset=>({id,name,kind,restitution:e,a:{id:'a',name:'Object A',mass:mA,position:-4,velocity:uA,radius:.5},b:{id:'b',name:'Object B',mass:mB,position:4,velocity:uB,radius:.5}});
export const collisionPresets:CollisionPreset[]=[
 pair('velocity-exchange','Equal Mass Velocity Exchange','elastic',1,1,1,5,0),
 pair('head-on','Head-On Equal Mass','elastic',1,1,1,5,-5),
 pair('heavy-light','Heavy Object Hits Light Object','elastic',1,5,1,5,0),
 pair('light-heavy','Light Object Hits Heavy Object','elastic',1,1,5,5,0),
 pair('perfectly-inelastic','Perfectly Inelastic','inelastic',0,1,1,5,0),
 pair('partial','Partially Inelastic','partial',.5,1,1,5,0),
 pair('moving-target','Moving Target','partial',.8,1,2,5,2),
];
export function collisionPreset(id:string):CollisionPreset{return collisionPresets.find(p=>p.id===id)??collisionPresets[0]!}

