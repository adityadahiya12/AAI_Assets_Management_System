"""
URL configuration for newsite project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from newsite import views
from django.conf import settings
from django.conf.urls.static import static


urlpatterns = [
    path('admin/', admin.site.urls),
    path('' , include('users.urls')),
    path('login/',views.login, name='admin'),
    
    path('',views.index,name = 'index'),
    path('home/',views.home,name = 'home'),
   
    
    path('main1/',views.main1,name = 'main1' ),
    path('accessibility/',views.accessibility,name = 'accessibility'),
    path('airtrafficmanagment/',views.airtrafficmanagment,name = 'airtrafficmanagment'),
    path('adminsignup/',views.adminsignup,name ='adminsignup' ),
    path('analytics/',views.analytics,name = 'analytics'),
    path('blog/',views.blog,name = 'blog'),
    path('cargologistics/',views.cargologistics,name = 'cargologistics'),
    path('commerical/',views.commerical,name = 'commerical'),
    path('contact/',views.contact,name = 'contact'),
    path('corporatecomm/',views.corporatecomm,name ='corporatecomm' ),
    path('dashboard/',views.dashboard,name = 'dashboard'),
    path('department/',views.department,name = 'department'),
    path('enginnering',views.enginnering,name ='enginnering'),
    path('features/',views.features,name = 'features'),
    path('feedback/',views.feedback,name = 'feedback'),
    path('finance/',views.finance,name = 'finance'),
    path('humanresource/',views.humanresource,name = 'humanresource'),
    path('issue/',views.issue,name = 'issue'),
    path('itdept/',views.itdept,name = 'itdept'),
    #path('ITticketing/',views.ITticketing,name = 'ITticketing'),
    path('lawcell/',views.lawcell,name ='lawcell' ),
    path('login/',views.login,name = 'login'),
    
    path('maintance/',views.maintance,name = 'maintance'),
    path('notification/',views.notification,name = 'notification'),
    path('operational/',views.operational,name = 'operational'),
    path('privacypolicy/',views.privacypolicy,name = 'privacypolicy'),
    path('profile/',views.profile,name = 'profile'),
    path('security/',views.security,name = 'security'),
    path('securitypolicy/',views.securitypolicy,name = 'securitypolicy'),
    path('showroute/',views.showroute,name ='showroute' ),
    path('sitemap/',views.sitemap,name = 'sitemap'),
    path('technicaldepartment/',views.techincaldepartment,name ='techincaldepartment' ),
    path('termsofuse/',views.termsofuse,name ='termofuse' ),
    path('workflow/',views.workflow,name = 'workflow'),
    path('adminITticketing/',views.adminITticketing,name = 'adminITticketing'),
    path('admindashboard/',views.admindashboard,name = 'admindashboard'),
    path('assetsbyadmin/',views.assetsbyadmin,name = 'assetsbyadmin'),
    path('auditlog/',views.auditlog,name = 'auditlog'),
    path('employeemanagment',views.employeemanagment,name = 'employeemanagment'),
    path('profileadmin/',views.profileadmin,name = 'profileadmin'),
    path('rough/',views.rough,name = 'rough'),
    path('securitycenter/',views.securitycenter,name = 'securitycenter'),
    path('settingadmin/',views.settingadmin,name = 'settingadmin'),
    path('vendormanagment/',views.vendormanagment,name = 'vendormanagment'),
   # path('addasset/',views.addasset,name = 'addasset'),
    path('help-center/',views.help_center,name = 'help_center'),
    path('about/',views.about,name = 'about'),
   # path('register/',views.register_user,name = 'resister_user'),
    path('ITdepartment/',views.ITdepartment,name = 'ITdepartment'),
    
    


    
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)  

