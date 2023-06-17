export interface Field {
    label: string;
    name: string;
    type: string;
    value?: any;
    required: boolean;
    options?: SelectOption[];
  }
  
  export interface SelectOption {
    label: string;
    value?: any;
    disabled?: boolean;
  }

  export enum FacultyOptions {
    Science = 'מדעים מדוייקים',
    LifeScience = 'מדעי החיים',
    Engineering = 'הנדסה',
    Judaism = 'יהדות',
    Social = 'מדעי החברה',
    Education = 'חינוך',
    Medicine = 'רפואה',
    Humanities = 'מדעי הרוח',
    Managment = 'הנהלה בכירה',
  }
  