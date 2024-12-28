import * as XLSX from 'xlsx';

export function createSampleExcel() {
  // Create workbook
  const wb = XLSX.utils.book_new();

  // Employees sheet data
  const employeesData = [
    ['Department', 'Name', 'Position', 'Salary'],
    ['Engineering', 'John Smith', 'Senior Developer', 85000],
    ['Engineering', 'Sarah Johnson', 'Software Engineer', 75000],
    ['Marketing', 'Michael Brown', 'Marketing Manager', 70000],
    ['Marketing', 'Emily Davis', 'Content Specialist', 60000],
    ['Sales', 'David Wilson', 'Sales Director', 90000],
    ['Sales', 'Lisa Anderson', 'Account Executive', 65000],
    ['HR', 'Jennifer Taylor', 'HR Manager', 72000],
    ['HR', 'Robert Martinez', 'HR Specialist', 58000]
  ];

  // Benefits sheet data
  const benefitsData = [
    ['Name', 'Insurance Plan', 'Vacation Days', 'Start Date'],
    ['John Smith', 'Premium', 20, '2020-01-15'],
    ['Sarah Johnson', 'Standard', 15, '2021-03-01'],
    ['Michael Brown', 'Premium', 18, '2019-08-22'],
    ['Emily Davis', 'Basic', 15, '2021-06-10'],
    ['David Wilson', 'Premium', 22, '2018-11-05'],
    ['Lisa Anderson', 'Standard', 15, '2022-01-20'],
    ['Jennifer Taylor', 'Premium', 20, '2019-04-15'],
    ['Robert Martinez', 'Basic', 15, '2022-09-01']
  ];

  // Create sheets
  const wsEmployees = XLSX.utils.aoa_to_sheet(employeesData);
  const wsBenefits = XLSX.utils.aoa_to_sheet(benefitsData);

  // Add sheets to workbook
  XLSX.utils.book_append_sheet(wb, wsEmployees, 'Employees');
  XLSX.utils.book_append_sheet(wb, wsBenefits, 'Benefits');

  // Generate buffer
  const buffer = XLSX.write(wb, { type: 'array', bookType: 'xlsx' });
  return new Blob([buffer], { 
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  });
}