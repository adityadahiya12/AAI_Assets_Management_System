# your_app/forms.py
from django import forms
from .models import Employee

class RegistrationForm(forms.ModelForm):
    # These fields are not in the model, they are just for form validation
    password = forms.CharField(widget=forms.PasswordInput)
    confirm_password = forms.CharField(widget=forms.PasswordInput, label="Confirm Password")

    class Meta:
        model = Employee
        fields = ['full_name', 'employee_id', 'email', 'phone_number', 'department', 'location', 'terms_agreed']
        
    def clean(self):
        # This method is called to validate the entire form data
        cleaned_data = super().clean()
        password = cleaned_data.get("password")
        confirm_password = cleaned_data.get("confirm_password")

        if password and confirm_password and password != confirm_password:
            self.add_error('confirm_password', "Passwords do not match.")
        
        # You can add more complex password validation here, such as length requirements
        if password and len(password) < 8:
            self.add_error('password', "Password must be at least 8 characters long.")

        return cleaned_data    
    
    
    
    
from django import forms
from .models import Asset

class AssetForm(forms.ModelForm):
    class Meta:
        model = Asset
        fields = [
            'asset_name', 'asset_category', 'brand', 'model', 'serial_number',
            'purchase_date', 'vendor_name', 'warranty_period', 'assigned_department',
            'asset_photo', 'initial_status', 'notes'
        ]
        widgets = {
            'purchase_date': forms.DateInput(attrs={'type': 'date'}),
        }  
        
        
        
#this form is used to managing it ticketing system
from django import forms
from .models import ITTicket

class ITTicketForm(forms.ModelForm):   
    class Meta:
        model = ITTicket
        fields = [
            'full_name', 'employee_id', 'contact_email', 'department',
            'related_asset', 'priority', 'issue_type', 'issue_description',
            'urgent', 'attachments'
        ]
        widgets = {
            'issue_description': forms.Textarea(attrs={'rows': 4}),
            'urgent': forms.CheckboxInput(),
        }                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          