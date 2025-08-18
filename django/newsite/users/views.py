from django.shortcuts import render, redirect
from django.contrib.auth.models import User
from users.forms import RegistrationForm
from users.forms import AssetForm
from django.contrib.auth import authenticate, login

def register_user(request):
    if request.method == 'POST':
        # Create a form instance and populate it with data from the request
        form = RegistrationForm(request.POST)
        
        if form.is_valid():
            user = User.objects.create_user(
                username=form.cleaned_data['employee_id'],
                email=form.cleaned_data['email'],
                password=form.cleaned_data['password'],
                first_name=form.cleaned_data['full_name']
            )
            # Save the form data to the database
            # The 'terms_agreed' and other fields will be saved
            employee = form.save(commit=False)
            employee.user = user
            employee.save()
            return redirect('success_page') # You need to define a 'success_page' URL
            # Here, we would handle password hashing (best practice)
            # However, for this simple model, we're not storing the password.
            # If you were using Django's built-in User model, you'd do this:
       
            
            # Redirect to a success page or login page after successful registrati
                                                                                          
    else:
        # If it's a GET request, create a new empty form
     form = RegistrationForm()
    
    return render(request, 'register.html', {'form': form})
    
    
# views for success page    
def success_page(request):
        return render(request, 'success.html')


# newsite/users/views.py ligin.html


def login(request):
    if request.method == 'POST':
        employee_id = request.POST.get('employeeId')
        password = request.POST.get('password')
        
     
        
        # Yahan hum user ko authenticate kar rahe hain
        user = authenticate(request, username=employee_id, password=password)
        
        if user is not None:
            # Agar user authenticated hai, toh usko login karayein
            #login(request)
            return redirect('home') # Ab login hone par dashboard par jayega
        else:
            # Agar authentication failed ho toh error message dikhayein
            error_message = "Invalid Employee ID or Password."
            return render(request, 'login.html', {'error_message': error_message})
    
    return render(request, 'login.html')    



# this view for adding asset
    
def add_asset(request):
    if request.method == 'POST':
        form = AssetForm(request.POST, request.FILES)
        if form.is_valid():
            form.save()
            return redirect('success_page1')  # Or redirect to asset list page
    else:
        form = AssetForm()
    return render(request, 'addassest.html', {'form': form})    



#this view for success page after adding asset
    
def asset_success(request):    
    return render(request,'success_asset.html')







    
#this is for IT ticketing system    
from django.shortcuts import render, redirect
from .forms import ITTicketForm

def create_ticket(request):
    if request.method == 'POST':
        form = ITTicketForm(request.POST, request.FILES)
        if form.is_valid():
            form.save()
            return redirect('ticket_success')
    else:
        form = ITTicketForm()
    return render(request, 'ITticketing.html', {'form': form})

def ticket_success(request):
    return render(request, 'ticket_success.html')    
    