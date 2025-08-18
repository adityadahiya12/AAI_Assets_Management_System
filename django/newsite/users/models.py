

# your_app/models.py
#from django.contrib.auth.models import AbstractUser
from django.db import models
from django.contrib.auth.models import User

class Employee(models.Model):
    ##user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='employee')  # Add this line
    full_name = models.CharField(max_length=200)
    employee_id = models.CharField(max_length=10, unique=True, help_text="Employee ID should be unique (e.g., EMP1234)")
    email = models.EmailField(unique=True)
    phone_number = models.CharField(max_length=15)
    DEPARTMENT_CHOICES = [
        ('IT', 'Information Technology'),
        ('HR', 'Human Resources'),
        ('Finance', 'Finance'),
        ('Operations', 'Operations'),
    ]
    department = models.CharField(max_length=20, choices=DEPARTMENT_CHOICES)
    LOCATION_CHOICES = [
        ('Delhi', 'Delhi'),
        ('Mumbai', 'Mumbai'),
        ('Bangalore', 'Bangalore'),
        ('Hyderabad', 'Hyderabad'),
    ]
    location = models.CharField(max_length=20, choices=LOCATION_CHOICES)
    terms_agreed = models.BooleanField(default=False)

    def __str__(self):
        return self.full_name   



#this function for add_asset_form

class Asset(models.Model):
    CATEGORY_CHOICES = [
        ('laptop', 'Laptop'),
        ('mobile', 'Mobile'),
        ('desktop', 'Desktop'),
        ('tablet', 'Tablet'),
        ('accessory', 'Accessory'),
        ('other', 'Other'),
    ]
    WARRANTY_CHOICES = [
        ('6months', '6 Months'),
        ('1year', '1 Year'),
        ('2years', '2 Years'),
        ('3years', '3+ Years'),
    ]
    DEPARTMENT_CHOICES = [
        ('IT', 'IT'),
        ('HR', 'HR'),
        ('Operations', 'Operations'),
        ('Engineering', 'Engineering'),
        ('ATM', 'ATM'),
        ('Commercial', 'Commercial'),
        ('Finance', 'Finance'),
        ('Marketing', 'Marketing'),
    ]
    STATUS_CHOICES = [
        ('in-stock', 'In Stock'),
        ('in-use', 'In Use'),
    ]

    asset_name = models.CharField(max_length=100)
    asset_category = models.CharField(max_length=20, choices=CATEGORY_CHOICES)
    brand = models.CharField(max_length=50)
    model = models.CharField(max_length=50)
    serial_number = models.CharField(max_length=50, unique=True)
    purchase_date = models.DateField()
    vendor_name = models.CharField(max_length=100)
    warranty_period = models.CharField(max_length=10, choices=WARRANTY_CHOICES)
    assigned_department = models.CharField(max_length=20, choices=DEPARTMENT_CHOICES)
    asset_photo = models.ImageField(upload_to='assets/', blank=True, null=True)
    initial_status = models.CharField(max_length=10, choices=STATUS_CHOICES)
    notes = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"{self.asset_name} ({self.serial_number})"



#it ticking code for form backend
from django.db import models

class ITTicket(models.Model):
    DEPARTMENT_CHOICES = [
        ('Air Traffic Control', 'Air Traffic Control'),
        ('Engineering', 'Engineering'),
        ('Security', 'Security'),
        ('Administration', 'Administration'),
        ('IT Services', 'IT Services'),
        ('Maintenance', 'Maintenance'),
        ('Other', 'Other'),
    ]
    PRIORITY_CHOICES = [
        ('critical', 'Critical - System Down'),
        ('high', 'High - Major Impact'),
        ('medium', 'Medium - Partial Functionality'),
        ('low', 'Low - General Inquiry'),
    ]
    ISSUE_TYPE_CHOICES = [
        ('Hardware', 'Hardware'),
        ('Software', 'Software'),
        ('Network', 'Network'),
        ('Access/Permissions', 'Access/Permissions'),
        ('Email', 'Email'),
        ('Other', 'Other'),
    ]

    full_name = models.CharField(max_length=100)
    employee_id = models.CharField(max_length=20)
    contact_email = models.EmailField()
    department = models.CharField(max_length=30, choices=DEPARTMENT_CHOICES)
    related_asset = models.CharField(max_length=100, blank=True, null=True)
    priority = models.CharField(max_length=10, choices=PRIORITY_CHOICES)
    issue_type = models.CharField(max_length=20, choices=ISSUE_TYPE_CHOICES)
    issue_description = models.TextField()
    urgent = models.BooleanField(default=False)
    attachments = models.FileField(upload_to='tickets/', blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.full_name} - {self.issue_type} ({self.priority})"

                                                                 
  


