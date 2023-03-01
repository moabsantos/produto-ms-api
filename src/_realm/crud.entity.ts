
import { BaseModelCrud } from "src/_shared/base-model-crud.entity";
import { Entity, Unique } from "typeorm";

@Entity()
@Unique("uniq_name", ["name", "created_by"])
export class Realm extends BaseModelCrud{}