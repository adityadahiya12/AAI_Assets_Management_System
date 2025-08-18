#nesstie/users/urls.py
from django.urls import path
from users import views
urlpatterns = [
     path('login/', views.login, name='login'),
     path('register/', views.register_user, name='register_user'),
     path('success/', views.success_page, name='success_page'),
     path('add_asset/', views.add_asset, name='addasset'),
     path('asset_added/',views.asset_success,name='success_page1'),
     path('create-ticket/', views.create_ticket, name='ITticketing'),
     path('ticket_success/', views.ticket_success, name='ticket_success'),
                                              
]
    