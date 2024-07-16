import { TableKeyDynamic } from '#/helpers';
import sql, { ISqlType } from 'mssql'

export type ParamTypes = 'VarChar' | 'NVarChar' | 'Text' | 'Int' | 'BigInt' | 'TinyInt' | 'SmallInt' | 'Bit' | 'Float' | 'Numeric' | 'Decimal' | 'Real' | 'Date' | 'DateTime' | 'DateTime2' | 'DateTimeOffset' | 'SmallDateTime' | 'Time' | 'UniqueIdentifier' | 'SmallMoney' | 'Money' | 'Binary' | 'VarBinary' | 'Image' | 'Xml' | 'Char' | 'NChar' | 'NText' | 'TVP' | 'UDT' | 'Geography' | 'Geometry' | 'Variant';

export interface ParamInfo {
  name: string;
  type: ParamTypes;
  value: any;
  length?: number;
  precision?: number;
  scale?: number;
}

export interface QueryOptions {
  query: string;
  params?: ParamInfo[];
  tableKeys?: TableKeyDynamic
}

export const sqlTypeMap: { [key: string]: (length?: number, precision?: number, scale?: number) => ISqlType } = {
  'VarChar': sql.VarChar,
  'NVarChar': sql.NVarChar,
  'Text': sql.Text,
  'Int': sql.Int,
  'BigInt': sql.BigInt,
  'TinyInt': sql.TinyInt,
  'SmallInt': sql.SmallInt,
  'Bit': sql.Bit,
  'Float': sql.Float,
  'Numeric': sql.Numeric,
  'Decimal': sql.Decimal,
  'Real': sql.Real,
  'Date': sql.Date,
  'DateTime': sql.DateTime,
  'DateTime2': sql.DateTime2,
  'DateTimeOffset': sql.DateTimeOffset,
  'SmallDateTime': sql.SmallDateTime,
  'Time': sql.Time,
  'UniqueIdentifier': sql.UniqueIdentifier,
  'SmallMoney': sql.SmallMoney,
  'Money': sql.Money,
  'Binary': sql.Binary,
  'VarBinary': sql.VarBinary,
  'Image': sql.Image,
  'Xml': sql.Xml,
  'Char': sql.Char,
  'NChar': sql.NChar,
  'NText': sql.NText,
  'TVP': sql.TVP,
  'UDT': sql.UDT,
  'Geography': sql.Geography,
  'Geometry': sql.Geometry,
  'Variant': sql.Variant,
}
