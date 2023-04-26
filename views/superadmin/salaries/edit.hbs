<?php $school_id = school_id(); ?>
<?php $salaries = $this->db->get_where('salaries', array('id' => $param1))->result_array(); ?>
<?php $deductions = $this->db->get_where('deductions', array('school_id' => $school_id))->result_array();?>
<?php foreach($salaries as $salary): ?>
<form method="POST" class="d-block ajaxForm" action="<?php echo route('salary/updated/'.$param1); ?>">
    <div class="form-row">
        <input type="hidden" name="school_id" value="<?php echo school_id(); ?>">
        <div class="form-group col-md-12">
            <label for="level"><?php echo get_phrase('new_salary_level'); ?></label>
            <input type="text" value="<?php echo $salary['level'];?>" class="form-control" id="level" name = "level" required>
            <small id="name_help" class="form-text text-muted"><?php echo get_phrase('provide_salary_level'); ?></small>
        </div>
        <div class="form-group col-md-12">
            <label for="amount"><?php echo get_phrase('amount'); ?></label>
            <input type="number" value="<?php echo $salary['amount'];?>"  class="form-control" id="amount" name = "amount" required>
            <small id="name_help" class="form-text text-muted"><?php echo get_phrase('fill_salary_amount'); ?></small>
        </div>
        
        <div class="form-group col-md-12">
            <label for="ss_deduction"><?php echo get_phrase('select_deductions'); ?></label>
        
        <?php foreach($deductions as $deduction):?>
        <div class="form-check">
        <?php if($salary['amount']>= $salary['take_home']):?>
        <input class="form-check-input" type="checkbox" value="0" id="<?php echo 'check_id'.$deduction['id'];?>" checked>
        <?php else: ?>
        <input class="form-check-input" type="checkbox" value="0" id="<?php echo 'check_id'.$deduction['id'];?>" >
        <label class="form-check-label" for="flexCheckChecked">
        <?php endif; ?>
            <?php echo $deduction['name']; ?>
        </label>
        </div>
        <?php endforeach;?>
        </div>
        <div class="form-group col-md-12">
            <label for="ss_deduction"><?php echo get_phrase('total_deduction_amount'); ?></label>
            <input type="number" value="<?php echo $salary['ss_deduction'];?>"  class="form-control" id="ss_deduction" name = "ss_deduction" readonly>
            <small id="name_help" class="form-text text-muted"><?php echo get_phrase('deduction_amount'); ?></small>
        </div>
        <div class="form-group col-md-12">
            <label for="take_home"><?php echo get_phrase('take_home'); ?></label>
            <input type="number" value="<?php echo $salary['take_home'];?>"  class="form-control" id="take_home" name = "take_home" readonly>
            <small id="name_help" class="form-text text-muted"><?php echo get_phrase('take_home_amount'); ?></small>
        </div>
    </div>
        <div class="form-group  col-md-12">
            <button class="btn btn-block btn-primary" type="submit"><?php echo get_phrase('update_salary'); ?></button>
        </div>
    </div>
</form>

<script>
$(document).ready(function() {
    //set initial state.
    <?php foreach($deductions as $deduction):?>
    var amount = <?php echo $salary['amount'];?>;
    var takehome;
    var totalDeduction = 0;
    var deduction<?php echo $salary['id'];?>;
    $('<?php echo '#check_id'.$deduction['id'] ?>').val(this.checked);
   
        $('#amount').change(function(){
            amount = $('#amount').val();
        });
    $('<?php echo '#check_id'.$deduction['id'] ?>').val(this.checked);
    $('<?php echo '#check_id'.$deduction['id'] ?>').change(function() {
        if(this.checked) {
        totalDeduction = $('ss_deduction').val();
        var totalDeduction1 = <?php echo ($salary['amount'] *($deduction['percent']/100))+$deduction['amount']; ?>;
        totalDeduction =+ totalDeduction1;
        takehome =+ amount-totalDeduction;
        }else{
        totalDeduction = $('ss_deduction').val();
            var totalDeduction2 = <?php echo ($salary['amount'] *($deduction['percent']/100))+$deduction['amount']; ?>
            totalDeduction =- totalDeduction2;
            takehome =+ amount+totalDeduction1; 
        }     
        
        $('#ss_deduction').val(totalDeduction); 
        $('#take_home').val(takehome);  
    });
    
<?php endforeach;?>
});

$(".ajaxForm").validate({}); // Jquery form validation initialization
$(".ajaxForm").submit(function(e) {
    var form = $(this);
    ajaxSubmit(e, form, showAllSalaries);
});
</script>

<?php endforeach;?>
